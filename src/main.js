// 通用格式化css
import './assets/common.css';
// 移动端适配设置
import './util/flexible';
import Vue from 'vue';
import store from './vuex';
import router from './router';

// 所有接口
import api from './api/index';
Vue.use(api);

/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import YDUI from 'vue-ydui';
// ydui样式
import 'vue-ydui/dist/ydui.rem.css';
// import 'vue-ydui/dist/ydui.base.css';
Vue.use(YDUI);

// 引入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

// 公共方法
import common from './util/common.js';
Vue.use(common);

// 头部导航组件
import HeaderNav from './plugins/headerNav/headerNav.vue';
Vue.component('HeaderNav', HeaderNav);


import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// ydui弹框
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.px/dialog';
Vue.prototype.$dialog = {
	confirm: Confirm,
	alert: Alert,
	toast: Toast,
	notify: Notify,
	loading: Loading,
};



// 根据process.env.NODE_ENV判断执行环境
// 'development'     本地测试环境       对应  npm run dev
// 'test'            测试服务器环境     对应  npm run test
// 'production'      生产服务器环境     对应  npm run build

console.log('开发环境：' + process.env.NODE_ENV);

let vm = new Vue({
	el: '#app',
	store,
	router,
});



