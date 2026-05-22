/*
 * @Author: ray ray.chin@163.com
 * @Date: 2020-10-25 15:28:48
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2026-05-22 22:23:58
 * @FilePath: /project-templete-ray-vue/src/pages/map/config-map.js
 * @Description: 地图服务相关
 * Copyright (c) 2022 by ray ray.chin@163.com, All Rights Reserved.
 */
let mapBgUrl, blockUrl, blockUser, blockPassword,
    uniformUrl, uniformUser, uniformPassword;

// 市级底图
mapBgUrl = "http://raychin.github.io/tilemap_1/rest/services/XX_DDFE/MapServer";
// // 统一地址
uniformUrl = "http://218.17.85.70:9999";
uniformUser = 'admin';
uniformPassword = '123456';
// 市里块数据正式
blockUrl = "http://58.250.156.18:8088";
blockUser = "appname";
blockPassword = "pass123";

// 地图及相关服务环境，默认是市级环境，1为区级环境
let mapEnv = 1;
switch (mapEnv) {
    case 1:
        // 区级环境
        // 区级区底图
        // mapBgUrl = "http://10.200.66.17:6080/arcgis/rest/services/MAPSJ/DTVEC_QS_ZQ_NS/MapServer";
        mapBgUrl = "https://raychin.github.io/mapServer/arcgis/rest/services/MAPSJ/DTVEC_QS_ZQ_NS/MapServer";
        // 市级区级区块数据
        // blockUrl = "http://10.200.66.39:9000";
        blockUrl = "https://raychin.github.io/blockServer";
        blockUser = "appname";
        blockPassword = "pass123";
        // 统一地址
        // uniformUrl = "http://10.200.66.41:8091";
        uniformUrl = "https://raychin.github.io/addressServer";
        uniformUser = 'nsltt';
        uniformPassword = 'pass123';
        break;
}

export {
    mapEnv,
    mapBgUrl,
    blockUrl,
    blockUser,
    blockPassword,
    uniformUrl,
    uniformUser,
    uniformPassword
}