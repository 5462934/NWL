// 启动及配置
import Vue from './vue.js';

import App from './App.js';
import Add from './Add.js';
import Update from './Update.js';
import Del from './Del.js';
import List from './List.js';

// 注册全局组件
Vue.component('add', Add);
Vue.component('update', Update);
Vue.component('del-vue', Del);
Vue.component('list', List);

// 创建实例对象
new Vue({
  el: '#app',
  render: c => c(App),
})