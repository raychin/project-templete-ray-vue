/*
 * @Author: ray ray.chin@163.com
 * @Date: 2020-09-08 10:32:58
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2022-08-17 14:30:00
 * @FilePath: /project-templete-ray-vue/src/api/url.js
 * @Description: 配置文件
 * Copyright (c) 2022 by ray ray.chin@163.com, All Rights Reserved.
 */
// 设置接口请求地址
let ssoUrl,
geoSocialId,
geoSocialPassword,
// 是否自动登录
isAutoLogin = false;

// 综治平台登录及相关数据字典接口
ssoUrl = "https://raychin.github.io/ray-manage/";
geoSocialId = "qinlei01";
geoSocialPassword = "Aa@888888";
isAutoLogin = true;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
    // development production
} else if (process.env.NODE_ENV === "production") {
    // production development
}


export {
    ssoUrl,
    geoSocialId,
    geoSocialPassword,
    isAutoLogin,
}
