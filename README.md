<!-- Created by yaoyanhui on 2018/12/10. -->
<!-- Email:yyh9465@163.com -->

# 项目名称 v0.0.1(吉奥版)

#### 项目介绍

vue2-wp4-ydui构建，吉奥专用(链动基座)

#### 软件架构

>(特别注意，新建项目需要修改端口号。入口：build/webpack.dev.config.js)

```
devServer: {
	port: '9009',//修改不同的端口号
}
```

> 配置分开

+ 路由配置----src/router
+ vue封装及配置----src/libs/vue.js
+ axios封装----src/api/fetch.js
+ axios配置----src/api/index.js
+ 所有后台接口---src/api/api.js
+ 创建UUID----src/util/createUUID.js
+ 获取当前年月日等----src/util/nowDatetime.js
+ 上传附件----src/util/uploading.js
+ 登录时生成随机数----src/util/randomWord.js
+ 坐标系转换----src/util/bd0911toWGS84.js
+ rem 自适应（1rem=100px）----src/util/flexible.js
+ 设置带过期时间的localStorage及获取----src/util/common.js

> 静态资源目录

```text
src/static/
```

配置这个目录中的资源复制迁移--适合独立页面

#### 安装教程

1.clone项目到本地

2.安装依赖(npm intsall)

3.运行项目(npm run dev)

4.测试打包(npm run test)

5.生产打包(npm run build)


#### 使用说明


根据需要构建的CLI

> 开发服务器用的是webpack自带的dev-server

> 区分开开发环境和生产构建环境
+ 根据process.env.NODE_ENV判断执行环境
+ 'development'   	 	本地测试环境    	对应  npm run dev
+ 'test'            	测试服务器环境  	对应  npm run test
+ 'production'    	 	生产服务器环境  	对应  npm run build

> 依赖控制采用yarn

> devServer配置代理

```
"proxy": {
    '*': {
        target: 'https://***',
        secure: false
    }
}
```

> vuex缓存

[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

```javascript
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})

```

>公用组件 (/src/plugins/...)

+ /headerNav     头部导航

+ /addPhotos     附件选择弹框

+ /backDialog    编辑页面返回确认弹框


>静态资源 (/src/static/...)

+ /app.json     上传链动必须（scheme 唯一项目名，startPageUrl首页，version版本）

+ /bingo_cordova.min.js    通过cordova.js获取相机，相册，定位等功能

+ /GeoGlobeJS.min.js    GeoGlobe地图

+ /mapbox-gl.js    mapbox地图

+ /moa.js    获取联动基座登录信息，定位信息等

+ /zepto.js   自行百度


>页面路径(/page)

+ /home 	商户主体首页

+ /map  	地图页面









#### 相关资源

1. 联系方式 yyh9465@163.com
2. VUE官网 [https://cn.vuejs.org](https://cn.vuejs.org/)
3. YDUI官网 [http://vue.ydui.org](http://vue.ydui.org/) 
4. webpack官网 [https://www.webpackjs.com/](https://www.webpackjs.com/) 

