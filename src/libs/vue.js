import Vue from 'vue';

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// 开发及测试环境开启错误报告
if (process.env.NODE_ENV === "local") {

	Vue.config.errorHandler = function (err, vm, info) {
		// handle error
		// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
		// 只在 2.2.0+ 可用
		alert({mes: err + '\t' + info})

	}

	Vue.config.warnHandler = function (msg, vm, trace) {
		// `trace` 是组件的继承关系追踪
		alert({mes: msg + '\t' + trace})
	}
} else if (process.env.NODE_ENV === "development") {
	Vue.config.errorHandler = function (err, vm, info) {
		// handle error
		// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
		// 只在 2.2.0+ 可用
		console.log(err)
		console.log(info)
	}

	Vue.config.warnHandler = function (msg, vm, trace) {
		// `trace` 是组件的继承关系追踪
		console.log(trace);
		console.log(msg);
	}
}

// 为标题设置自定义的指令
// 在各自的路由根组件上加上v-title设置标题
Vue.directive("title", {
	bind(el, binding) {
		document.title = binding.value;
	}
})

export default Vue;