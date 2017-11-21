'use strict';
// 引入path核心对象
const path = require('path');
// 引入数据库对象
const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: '127.0.0.1',
	user: 'root',
	password: 'linawei',
	database: 'album'
});
// 解析post请求体数据
const bodyParser = require('body-parser');
// 文件功能增强的包
const fse = require('fs-extra');
//解析文件上传的包
const formidable = require('formidable');
const express = require('express');
// 创建服务器
let app = express();
// 配置模板引擎
app.engine('html', require('express-art-template'));
// 配置路由规则
let router = express.Router();



// 查询照片列表名称
router.get('/', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if (err) return next(err); // 后面处理连接异常错误
		connection.query('select * from album_dir', (error, results) => {
			connection.release();
			if (err) return next(err);// 后面处理查询带来的异常
			res.render('index.html', {
				album: results
			})
		})
	})
})
	// 点击照片列表，跳转到该详情页
	.get('/showDir', (req, res, next) => {
		// 获取url上的查询字符串
		let dirname = req.query.dir;
		// console.log(dirname);
		pool.getConnection((err, connection) => {
			// 使用连接查询所有的album_dir所有数据
			connection.query('select * from album_file where dir = ?', [dirname], (error, results) => {
				// 查询完毕以后，释放连接
				connection.release();
				if (error) return next(err);
				// 记录相册名
				res.render('album.html', {
					album: results,
					dir: dirname
				})
			})
		})
	})
	// 添加目录
	.post('/addDir', (req, res, next) => {
		let dirname = req.body.dirname;
		pool.getConnection((err, connection) => {
			connection.query('insert into album_dir values (?)', [dirname], (error, results) => {
				connection.release();
				if (err) return next(err);

				// 创建本地文件夹
				const dir = `./resource/${dirname}`;

				// 确保目录存在
				fse.ensureDir(dir, err => {
					// 重定向，去到新创建的目录
					res.redirect('/');
				})
			})
		})
	})

	// 添加照片
	.post('/addPic', (req, res, next) => {
		var form = new formidable.IncomingForm();

		let rootPath = path.join(__dirname, 'resource');

		// 设置默认上传目录
		form.uploadDir = rootPath;
		form.parse(req, function (err, fields, files) {
			if (err) return next(err);

			// path->parse->base base 代表的是文件的全名 xxx.xxx
			let filename = path.parse(files.pic.path).base;

			// 移动文件
			let dist = path.join(rootPath, fields.dir, filename);
			fse.move(files.pic.path, dist, (err) => {
				if (err) return next(err);
				// 将数据保存进数据库
				let db_file = `/resource/${fields.dir}/${filename}`;
				let db_dir = fields.dir;

				pool.getConnection((err, connection) => {
					if (err) return next(err);
					connection.query('insert into album_file values (?,?)', [db_file, db_dir], (error, results) => {
						connection.release();
						if (error) return next(err);
						res.redirect('/')
					})
				})
			})

		})
	})



// 处理静态资源
// /public/vender/bootstrap/js/bootstrap.js
app.use('/public', express.static('./public'));
app.use('/resource', express.static('./resource'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
///中间件执行列表
app.use(router);

// 错误处理中间件
app.use((err, req, res, next) => {
	console.log('出错啦.-------------------------');
	console.log(err);
	console.log('出错啦.-------------------------');
	res.send(`
            您要访问的页面出异常拉...请稍后再试..
            <a href="/">去首页玩</a>
    `);
})
app.listen(8888, () => {
	console.log('服务开启，8888');
})