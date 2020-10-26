// 倒入所有接口
import * as apiList from './api'

const install = Vue => {
	if (install.installed)
		return;
	install.installed = true;

	Object.defineProperties(Vue.prototype, {
		// 此处挂载在 Vue 原型的 $api 对象上
		$api: {
			get() {
				return apiList
			}
		}
	})
};

export default install