// 配置文件
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
