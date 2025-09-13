/*
 * @Author: ray ray.chin@163.com
 * @Date: 2020-10-25 15:28:48
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2022-08-17 14:31:02
 * @FilePath: /project-templete-ray-vue/src/pages/map/config-map.js
 * @Description: 地图服务相关
 * Copyright (c) 2022 by ray ray.chin@163.com, All Rights Reserved.
 */
let mapBgUrl, blockUrl, blockUser, blockPassword,
    uniformUrl, uniformUser, uniformPassword;

// 深圳市底图
mapBgUrl = "http://pnr.sz.gov.cn/d-suplicmap/tilemap_1/rest/services/SZMAP_BASEMAP_GK2K/MapServer";
// // 统一地址
uniformUrl = "http://218.17.85.70:9999";
uniformUser = 'szdp';
uniformPassword = '123456';
// 市里块数据正式
blockUrl = "http://58.250.156.18:8088";
blockUser = "nsapp";
blockPassword = "geostar999";

// 地图及相关服务环境，默认是深圳市环境，1为南山环境
let mapEnv = 1;
switch (mapEnv) {
    case 1:
        // 南山环境
        // 南山区底图
        // mapBgUrl = "http://10.200.66.17:6080/arcgis/rest/services/NSKSJ/DTVEC_QS_ZQ_NS/MapServer";
        mapBgUrl = " https://rioweb.szns.gov.cn/zsdsjdy/mapServer/arcgis/rest/services/NSKSJ/DTVEC_QS_ZQ_NS/MapServer";
        // 深圳市南山区块数据
        // blockUrl = "http://10.200.66.39:9000";
        blockUrl = "https://rioweb.szns.gov.cn/zsdsjdy/blockServer";
        blockUser = "nsapp";
        blockPassword = "geostar999";
        // 统一地址
        // uniformUrl = "http://10.200.66.41:8091";
        uniformUrl = "https://rioweb.szns.gov.cn/zsdsjdy/addressServer";
        uniformUser = 'nsltt';
        uniformPassword = 'geostar999';
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