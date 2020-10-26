import Vue from 'vue'
import VueRouter from 'vue-router'

/*
同步加载组件样式
import FlightListPanel from '../pages/flight-list-panel/flight-list-panel.vue'

*/

//异步加载组件样式
// const FlightListPanel = resolve => require(['../pages/flight-list-panel/flight-list-panel.vue'], resolve);

//pages是从DefinePlugin插件中获取参数pages的页面路径数组
let pagesArr = pages.map((cur, index, arr) => {
    return {
        path: `/${cur}`, //pages路径下的文件夹名 如: /home,/list等
        name: cur,
        components: {
            main: () => import(`../pages/${cur}/${cur}.vue`)
        }
    }
});



//将页面和板块页面合并
let arrList = pagesArr;

import Home from '../pages/home/home.vue';

arrList.unshift({
    path: '/',
    name: 'root',
    components: {
        main: () => import('../pages/home/home.vue')
    }
});

Vue.use(VueRouter);

const router = new VueRouter({
    routes: arrList
});

router.beforeEach((to, from, next)=>{
    // console.log("******路由前置处理******");
    //可以对路由进行判断及加载动画处理
    next();
})

//可以用 router.beforeResolve 注册一个全局守卫。
//这和 router.beforeEach 类似
//区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to, from, next)=>{
    // console.log("******路由前置--所有异步组件加载完毕******");
    next();
});

//全局后置钩子
//和守卫不同的是
//这些钩子不会接受 next 函数也不会改变导航本身
router.afterEach((to) => {
    //iView.LoadingBar.finish();  //可以在这里关闭加载动画
    window.scrollTo(0, 0);
});

export default router;
