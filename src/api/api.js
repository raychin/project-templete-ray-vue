/*
 * @Author: ray ray.chin@163.com
 * @Date: 2020-09-07 09:11:21
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2026-05-22 22:33:21
 * @FilePath: /project-templete-ray-vue/src/api/api.js
 * @Description: 
 * 
 * Copyright (c) 2026 by ray, All Rights Reserved.
 */
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


