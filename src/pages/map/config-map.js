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
        mapBgUrl = "http://10.200.66.17:6080/arcgis/rest/services/NSKSJ/DTVEC_QS_ZQ_NS/MapServer";
        // 深圳市南山区块数据
        blockUrl = "http://10.200.66.39:9000";
        blockUser = "nsapp";
        blockPassword = "geostar999";
        // 统一地址
        uniformUrl = "http://10.200.66.41:8091";
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