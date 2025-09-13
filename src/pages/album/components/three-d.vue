<!--
 * @Author: your name
 * @Date: 2020-09-08 10:32:58
 * @LastEditTime: 2025-09-13 20:51:57
 * @LastEditors: ray ray.chin@163.com
 * @Description: In User Settings Edit
 * @FilePath: /project-templete-ray-vue/src/pages/album/components/three-d.vue
-->
<template>
    <div class="wrapper">
        <div class="min-box">
            <div class="item item1"></div>
            <div class="item item2"></div>
            <div class="item item3"></div>
            <div class="item item4"></div>
            <div class="item item5"></div>
            <div class="item item6"></div>
        </div>
        <div class="max-box">
            <div class="item item1"></div>
            <div class="item item2"></div>
            <div class="item item3"></div>
            <div class="item item4"></div>
            <div class="item item5"></div>
            <div class="item item6"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ThreeD",
    data () {
        return {}
    },
    created () {

    },
    methods: {
        /**
         * 跳转到paths
         * @param {string} paths - routes name
         */
        jump (paths) {
            // this.$dialog.toast({ mes: "正在开发中", timeout: 1500 });
            this.$router.push({ path: paths })
        },
    },
    computed: {},
    watch: {},
}
</script>
<style scoped lang="scss">
.wrapper {
    width: 200px;
    height: 200px;
    margin: 200px auto;
    position: relative;
    /* 设置关键帧动画 */
    animation: inifiteAnimate 7s linear infinite;
    /* 设置3D模型 */
    transform-style: preserve-3d;
    position: absolute;
    left: 25%;
}

@media screen and (min-width: 1024px) {
    .wrapper {
        width: 200px;
        height: 200px;
        top: 10%;
        left: 45%;
    }
    
}

/* 关键帧动画 */
@keyframes inifiteAnimate {
    0% {
        transform: rotateX(0deg) rotateY(0deg);
    }

    100% {
        transform: rotateX(360deg) rotateY(360deg);
    }
}

.min-box,
.max-box {
    width: 100%;
    height: 100%;
    /* 设置3D模型 */
    transform-style: preserve-3d;
    /* 居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 2s;
}

.item {
    opacity: 0.6;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    transition: all 2s;
}

.item1 {
    background-image: url(../static/imgs/1.jpg);
    transform: translateZ(100px);
}

.item2 {
    background-image: url(../static/imgs/2.jpg);
    transform: rotateY(90deg) translateZ(100px);
}

.item3 {
    background-image: url(../static/imgs/3.jpg);
    transform: rotateY(-90deg) translateZ(100px);
}

.item4 {
    background-image: url(../static/imgs/4.jpg);
    transform: rotateY(-180deg) translateZ(100px);
}

.item5 {
    background-image: url(../static/imgs/5.jpg);
    transform: rotateX(90deg) translateZ(100px);
}

.item6 {
    background-image: url(../static/imgs/6.jpg);
    transform: rotateX(-90deg) translateZ(100px);
}

.wrapper:hover .max-box {
    width: 300px;
    height: 300px;
}

.wrapper:hover .max-box .item {
    width: 300px;
    height: 300px;
}

.wrapper:hover .max-box .item1 {
    transform: translateZ(300px);
}

.wrapper:hover .max-box .item2 {
    transform: rotateY(90deg) translateZ(300px);
}

.wrapper:hover .max-box .item3 {
    transform: rotateY(-90deg) translateZ(300px);
}

.wrapper:hover .max-box .item4 {
    transform: rotateY(-180deg) translateZ(300px);
}

.wrapper:hover .max-box .item5 {
    transform: rotateX(90deg) translateZ(300px);
}

.wrapper:hover .max-box .item6 {
    transform: rotateX(-90deg) translateZ(300px);
}
</style>