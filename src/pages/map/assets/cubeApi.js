/**
 * @Date: 2020-09-18
 * @Author: ray
*/
const api = {
    getFrQuery: {
        name: '根据中文获取企业列表',
        url: '/ksj_api/common_api/getFrQuery',
        request_type: 'post',
    },
    findAddress: {
        name: '根据名称模糊匹配搜索楼栋列表',
        url: '/ksj_api/common_api/getFwQuery',
        request_type: 'post',
    },
    getBuildingMsg: {
        name: '请求楼栋八级地址信息',
        url: '/ksj_api/common_api/getKjQuery',
        request_type: 'post',
    },
    getBuildingArea: {
        name: '获取楼栋中心点和面信息的接口',
        url: '/ksj_api/common_api/getKsjInfo',
        request_type: 'post',
    },
    responseMap: {
        name: '根据楼栋编码获取相应编码信息',
        url: '/ksj_api/common_api/getCommonData',
        request_type: 'post',
    },
    getGridArea: {
        name: '获取网格的面的信息',
        url: '/ksj_api/common_api/getCommonData',
        request_type: 'post',
    },
    getHouseList: {
        name: '请求分户图信息',
        url: '/ksj_api/common_api/getKsjInfo',
        request_type: 'post',
    },
    getDivisionsByLatLon: {
        name: '根据经纬度获取八级地址信息',
        url: '/ksj_api/common_api/getAreaBase',
        request_type: 'post',
    },
    getViewAreaByBuilding: {
        name: '根据当前视图范围获取视图内的楼栋数据',
        url: '/ksj_api/common_api/getAreaBase',
        request_type: 'post',
    },
    getAreaInfoByAreaCode: {
        name: '根据当前区划查询当前区划面信息',
        url: '/ksj_api/common_api/getAreaBase',
        request_type: 'post',
    },
    getAreaInfoByParentcode: {
        name: '根据区划查询子区划空间信息',
        url: '/ksj_api/common_api/getKjQuery',
        request_type: 'post',
    },
    getFwInfo: {
        name: '根据区划或名称查询楼栋信息（无空间信息）',
        url: '/ksj_api/common_api/getFwInfo',
        request_type: 'post',
    },
};
export default api;
