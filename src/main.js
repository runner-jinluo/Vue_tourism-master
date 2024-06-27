// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/js/jquery'
import './assets/js/jquery.cookie'
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/main'
import jQuery from 'jquery';
import 'jquery.cookie';

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css' //引入样式文件
Vue.use(ElementUI) //全局使用组件库

global.$ = jQuery;
global.ApiUrl = 'http://localhost:9090/api/' //全局定义api请求的服务器地址
global.count = 0

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

