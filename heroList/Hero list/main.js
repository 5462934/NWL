import Vue from './vue.js';
import VueRouter from './vue-router.js';

import App from './App.js';
import List from './List.js';
import Detail from './Detail.js';
// 安装插件
Vue.use(VueRouter);

// 创建路由对象
var router = new VueRouter();

// 动态添加路由规则
router.addRoutes([
  { name: 'list', path: '/list', component: List }, // 列表
  { name: 'detail', path: '/detail', component: Detail }, // 详情
  { name: 'detail2', path: '/detail/:mid', component: Detail }, // 详情
])

// 启动
new Vue({
  el: '#app',
  render: c => c(App),
  router
})