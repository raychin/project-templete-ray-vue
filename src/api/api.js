import request from './fetch'
import { ssoUrl } from './url'

// 登录
export function login(data) {
    return request({
        url: ssoUrl + 'user/loginNoCap',
        method: 'post',
        data: data
    })
}


