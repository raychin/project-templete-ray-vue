import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from '../vuex'

const instance = axios.create({
	baseURL: '',
	timeout: 20000, // 请求超时时间
	transformRequest: data => qs.stringify(data)
});
// request拦截器
instance.interceptors.request.use(
	e => {
		e.params = e.params || {};
		e.headers = e.headers || {};
		if (e.url.indexOf('geosocial-sso-manage') > -1 && e.data.token) {
            e.headers.accessToken = e.data.token;
        }
		// set 默认值
		return e
	},
	error => ({status: 0, msg: error.message})
);

// response拦截器
instance.interceptors.response.use(
	response => {
		const resp = response.data;
		if (response.status == 200) {
            if ((resp.code == 200 || resp.retCode == '00000' || resp.code == 0) && (resp.state || resp.success)) {
                return resp
            } else {
                Vue.prototype.$dialog.loading.close();
                Vue.prototype.$dialog.toast({ mes: resp.msg || resp.retMsg, timeout: 1500 });
            }
        }

		return resp
	},
	error => {
		if (error.response) {
			if (error.response.status !== 200) {
				Vue.prototype.$dialog.loading.close();
				Vue.prototype.$dialog.toast({mes: '系统内部错误,请联系管理员解决！', timeout: 1500});
			}
		}

		// vpn掉线||没有请求到接口
		if (!error.response) {
			Vue.prototype.$dialog.loading.close();
			Vue.prototype.$dialog.toast({mes: '当前网络异常，请稍后重试！', timeout: 1500});
		}

		// 连接超时
		if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
			Vue.prototype.$dialog.loading.close();
			Vue.prototype.$dialog.toast({mes: '当前网络异常，请稍后重试！', timeout: 1500});
			console.log('请求超时')

		}
		console.log('err' + error); // for debug
		return Promise.reject(error)
	}
);
export default instance