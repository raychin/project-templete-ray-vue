/**
 * Created by Administrator on 2017/3/15.
 */
export default {
	//保存token
	updateLoginData(state, data) {
		state.loginData = data;
	},
	//附件图片
	updateFilesData(state, data) {
		state.filesData = data;
	},

	//保存品高获取到的用户信息
	updateLoginInfo(state, data) {
		state.loginInfo = data;
	},
}