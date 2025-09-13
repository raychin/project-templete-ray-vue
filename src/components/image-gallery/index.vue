<!--
 * @Author: ray ray.chin@163.com
 * @Date: 2025-09-13 11:32:51
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2025-09-13 12:09:25
 * @FilePath: /project-templete-ray-vue/src/components/image-gallery/index.vue
 * @Description: 图片墙组件
 * 
 * Copyright (c) 2025 by ray, All Rights Reserved.
-->
<template>
    <div class="image-gallery">
        <img v-for="(image, index) in images" :key="index" :src="fromUrl(image)"
            :style="{ top: getRandomPosition(), left: getRandomPosition() }" class="image-item" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            images: ['1.jpg', '2.jpg', '3.jpg'],
        }
    },
    mounted () {
        // Load images from a specified directory
        this.loadImagesFromDirectory('img')
    },
    methods: {
        fromUrl (image) {
            return require(`../../pages/album/static/imgs/${image}`)
        },
        loadImagesFromDirectory (directory) {
            // const req = require.context(`../../assets/${directory}`, false, /\.(png|jpe?g|svg)$/)
            // this.images = req.keys()
        },

        // Random position between 0 and 60vw
        getRandomPosition () {
            return Math.floor(Math.random() * 60) + 'vw'
        },
    },
}
</script>

<style>
.image-gallery {
    position: relative;
    height: 100vh;
}

.image-item {
    position: absolute;
    transition: transform 1s;
    height: 35vh;
    width: 35vw;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>