import Vue from 'vue'

exports.install = function () {
	// 接口报错弹窗
	Vue.prototype.toastError = function (msg, executeFunction) {
		Vue.prototype.$dialog.loading.close();

		Vue.prototype.$dialog.toast({
			mes: msg,
			timeout: 1500,
			icon: 'error',
			callback: () => {
				// 执行函数
			}
		});
	};

	// 设置带过期时间的localStorage
	Vue.prototype.setLocalStorage = function (key, value, hours) {
		// 设置过期原则 days以天为单位
		if (!value) {
			localStorage.removeItem(key);
		} else {
			let Hours = hours || 2; // 默认保留2小时
			let exp = new Date();
			localStorage[key] = JSON.stringify({
				value,
				expires: exp.getTime() + Hours * 60 * 60 * 1000
			})
		}
	};

	// 读取localStorage
	Vue.prototype.getLocalStorage = function (name) {
		let o = localStorage[name];
		if (!o || JSON.parse(o).expires < Date.now()) {
			return null
		} else {
			return JSON.parse(o).value
		}
	};

	/**
     * 时间转换
     * @param {*} time 时间
     * @param {*} type 类型，默认为年月日，1为年月日时，2为年月日时分，3为年月日时分秒
     */
	Vue.prototype.handleTime = function (time, type) {
        if (!time) {
            return;
        }
        console.log(time);
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        let result = year + "年" + month + "月" + day + "日";
        if (!type) {
            return result;
        }
        switch (type) {
            case 1:
                result += (hour + "时");
                break;
            case 2:
                result += (hour + "时" + minute + "分");
                break;
            case 3:
                result += (hour + "时" + minute + "分" + second + "秒");
                break;
        }
        return result;
	};


};

