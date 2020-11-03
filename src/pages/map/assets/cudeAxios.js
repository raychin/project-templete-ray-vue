/* eslint-disable no-unused-vars */
// 引入axios请求
import axios from "axios";
import Vue from "vue";
import { blockUrl, blockUser, blockPassword } from "../config-map";
import md5 from 'blueimp-md5';

// 定义vm 等于 vue
let vm = new Vue({});

/**
 * @description: 获取块数据请求之前的token
 * @param {type}
 * @return:
 */
function getCubeToken() {
    let timestamp = new Date().getTime();
    let user = {
        userName: blockUser,
        passWord: blockPassword
    };
    let params = {
        time: timestamp,
        user: user.userName,
        secret: md5(timestamp + user.passWord)
    };
    return axios({
        method: "get",
        url: blockUrl + "/ksj_api/getToken",
        params: params
    }).then(res => {
        return res;
    });
}

async function fetchPost(url, params) {
    // 判断是否传请求类型
    if (!params.request_type) {
        // 否
        params.request_type = "post"; // 默认为post
    }
    // 判断请求类型为post或put
    let type = "";
    if (params.request_type == "post" || params.request_type == "put") {
        // 是
        type = "data"; // 以data形式传参
    } else {
        // 否
        type = "params"; // 以params形式传参
    }
    // 设置请求参数及类型等
    let httpDefaultOpts = {
        method: params.request_type, // 请求类型
        url: url, // 请求链接
        timeout: 20 * 1000, // 请求超时时间
        [type]: "" // 参数
    };
    // 删除请求类型对象
    delete params.request_type;
    let formData = null;
    // 判断参数是否data形式
    if (type == "data") {
        // 是
        // 转换为formData
        formData = new FormData();
        for (let i in params) {
            formData.append(i, params[i]);
        }
        let token = await getCubeToken();
        // 添加token
        formData.append("token", token.data.data.token);
    } else {
        formData = params;
    }
    // 设置请求参数值
    httpDefaultOpts[type] = formData;
    // 返回请求数据到promise
    return new Promise((resolve, reject) => {
        // 请求方法
        axios(httpDefaultOpts)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                // 提示请求发生错误，请检查网络
                vm.open4("请求发生错误,请检查网络");
                reject(error); // 请求失败数据返回
            });
    });
}

// 返回axios请求，名为Ajax
export default {
    Ajax(url, params) {
        return fetchPost(url, params);
    }
};
