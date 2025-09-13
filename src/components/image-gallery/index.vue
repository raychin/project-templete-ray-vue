<!--
 * @Author: ray ray.chin@163.com
 * @Date: 2025-09-13 11:32:51
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2025-09-13 21:56:38
 * @FilePath: /project-templete-ray-vue/src/components/image-gallery/index.vue
 * @Description: 图片墙组件
 * 
 * Copyright (c) 2025 by ray, All Rights Reserved.
-->
<template>
    <div ref="targetElement" class="screen-container">
        <!-- 使用transition-group管理多个图片元素的动画 -->
        <transition-group name="random-appear" tag="div" class="images-container">
            <div v-for="(image, index) in visibleImages" :key="image.id" :style="{
                top: image.positionY + 'px',
                left: image.positionX + 'px',
                'animation-delay': index * delayBetweenImages + 'ms'
            }" class="image-wrapper">
                <img :src="image.src" :alt="'Image ' + image.id" class="animated-image">
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "ImageGallery",
    props: {
        directory: {
            type: String,
            // 默认图片目录
            default: '../../static/album/1/'
        }
    },
    data () {
        return {
            images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
            // 所有图片资源数组，请替换为您的实际图片路径
            allImages: [
                { id: 1, src: null },
                { id: 2, src: null },
                { id: 3, src: null },
                // ... 添加更多图片
            ],
            visibleImages: [], // 当前已显示的图片
            nextImageIndex: 0, // 下一张待显示图片的索引
            delayBetweenImages: 800, // 图片出现的时间间隔（毫秒）
            maxSimultaneousImages: 10 // 最多同时显示的图片数量
        }
    },
    mounted () {

        // Load images from a specified directory
        this.loadImagesFromDirectory('img')
        // 2. 在 mounted 钩子中创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 3. 元素进入视口时执行的操作
                    console.log('元素进入视口！', entry.target)
                    // 组件挂载后开始序列显示图片
                    this.showNextImage()
                } else {
                    // 4. 元素离开视口时可执行的操作 (可选)
                    console.log('元素离开视口！')
                }
            })
        }, {
            threshold: 0.1, // 当元素 10% 进入视口时触发。可调整为 0 或 1
            rootMargin: '0px' // 视口边界偏移量
        })

        // 5. 开始观察目标元素
        observer.observe(this.$refs.targetElement)

        // 可选：将 observer 存储在组件实例上，以便在 beforeDestroy 中断开连接
        this.$data.observer = observer
    },
    beforeDestroy () {
        // 6. 组件销毁时停止观察，避免内存泄漏
        if (this.$data.observer) {
            this.$data.observer.disconnect()
        }
    },
    methods: {
        fromUrl (image) {
            // return require(`../../pages/album/static/imgs/${image}`)
            console.log(`${this.directory}${image}`)
            let path = `${this.directory}${image}`
            return require(`../../static/album/1/${image}`)
            // return require(path)
        },
        loadImagesFromDirectory (directory) {
            let obj = {}
            this.allImages = []
            for (let i = 0; i < this.images.length; i++) {
                obj = {
                    id: i + 1,
                    src: this.fromUrl(this.images[i])
                }
                this.allImages.push(obj)
            }
            // debugger
            // // const req = require.context('../../static/album/1/', false, /\.(png|jpg|jpe?g|svg)$/)
            // const req = require.context('../../assets/img/', false, /\.(png|jpg|jpe?g|svg)$/)
            // debugger
            // this.images = req.keys()
        },

        // 获取随机位置
        getRandomPosition () {
            const padding = 50 // 避免图片太靠近边缘
            let randomX = padding + Math.random() * (window.innerWidth - 3 * padding)
            let randomY = padding + Math.random() * (window.innerHeight - 2 * padding)
            const xWidth = (window.innerWidth / 3)
            const yHeight = (window.innerHeight / 3)
            if (randomX > xWidth) {
                randomX = xWidth + this.getRandomInt(1, 50)
            }
            if (randomY > yHeight) {
                randomY = yHeight + this.getRandomInt(1, 100)
            }
            return { x: randomX, y: randomY }
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // 显示下一张图片
        showNextImage () {
            if (this.nextImageIndex >= this.allImages.length) {
                console.log('All images have been displayed.')
                return
            }

            const position = this.getRandomPosition()
            const newImage = {
                ...this.allImages[this.nextImageIndex],
                positionX: position.x,
                positionY: position.y
            }

            this.visibleImages.push(newImage)
            this.nextImageIndex++

            // 如果同时显示的图片数量超过最大值，移除最旧的一张
            if (this.visibleImages.length > this.maxSimultaneousImages) {
                this.visibleImages.shift()
            }

            // 安排下一张图片的显示
            if (this.nextImageIndex < this.allImages.length) {
                setTimeout(this.showNextImage, this.delayBetweenImages)
            }
        }
    }
}
</script>

<style>
.screen-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /* background-color: #f0f0f0; */
    /* 背景色可根据需要调整 */
}

.images-container {
    width: 100%;
    height: 100%;
}

.image-wrapper {
    position: absolute;
    will-change: transform, opacity;
    /* 提示浏览器优化动画 */
}

.animated-image {
    width: 240px;
    /* 图片显示大小，可根据需要调整 */
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation-duration: 1.2s;
    animation-fill-mode: both;
    animation-name: randomAnimation;
    /* 使用随机动画 */
}

/* 入场过渡 */
.random-appear-enter-active {
    transition: all 0.8s ease;
}

.random-appear-enter {
    opacity: 0;
    transform: scale(0.5) rotate(30deg);
}

.random-appear-enter-to {
    opacity: 1;
    transform: scale(1) rotate(0);
}

/* 定义多种随机动画效果 */
@keyframes randomAnimation {
    0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }

    /* 微微浮动效果 */
    50% {
        transform: translate(0, -5px) rotate(0.5deg) scale(1.02);
    }

    100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
}

/* 可以定义更多的动画类，并在方法中随机分配 */
.animation-type-a {
    animation-name: floatAnimation;
}

.animation-type-b {
    animation-name: pulseAnimation;
}

.animation-type-c {
    animation-name: swingAnimation;
}

@keyframes floatAnimation {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulseAnimation {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes swingAnimation {

    0%,
    100% {
        transform: rotate(-3deg);
    }

    50% {
        transform: rotate(3deg);
    }
}
</style>