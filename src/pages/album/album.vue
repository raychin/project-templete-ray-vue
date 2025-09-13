<!--
 * @Author: your name
 * @Date: 2020-09-08 10:32:58
 * @LastEditTime: 2025-09-13 21:20:43
 * @LastEditors: ray ray.chin@163.com
 * @Description: In User Settings Edit
 * @FilePath: /project-templete-ray-vue/src/pages/album/album.vue
-->
<template>
    <div class="main">
        <!-- controls -->
        <!-- <audio id="myMusic" ref="audioPlayer" loop controls autoplay style="" muted="true">
            <source src="../../static/audio/1_Legends.wav" type="audio/mpeg">
            你的浏览器不支持 audio 元素。
        </audio> -->
        <component is="music-player"></component>

        <component is="slide-hide" @onHide="onHide"></component>

        <van-swipe class="my-swipe" indicator-color="white" vertical>
            <van-swipe-item v-for="(item, index) in pages" :key="`page${index}`">
                <div class="swipe-container">
                    <component v-if="item.is" :is="item.is"></component>
                    <div class="page-content">
                        {{ item.content }}
                    </div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import auid from '../../static/audio/1_Legends.wav'
import MusicPlayer from '../../components/music-player/index.vue'
import ThreeD from './components/three-d.vue'
import SlideHide from '../../components/slide-hide/index.vue'
import ImageGallery from '../../components/image-gallery/index.vue'

import { Howl, Howler } from 'howler';

import '@vant/touch-emulator';
export default {
    name: "Album",
    components: { ThreeD, MusicPlayer, SlideHide, ImageGallery },
    data () {
        return {
            sound: null,
            isOpen: false,
            url: auid,
            pages: [
                {
                    image: '',
                    content: '愿你目光澄澈，坚韧勇敢，去赏满天星辰，去追山川风月。',
                },
                {
                    image: '',
                    content: '咿呀学语，蹒跚学步，你的每一次尝试都让我们惊喜。继续勇敢探索吧。',
                },
                {
                    image: '',
                    content: '小小脑瓜充满奇思妙想，愿你的好奇心永远旺盛，在游戏中发现更广阔的世界。',
                },
                {
                    image: '',
                    content: '创造力爆棚的年纪！愿你笔下绘出彩虹，心中装满童话，每天都有新发现。',
                },
                {
                    image: '',
                    content: '即将步入校园，愿你带上好奇与勇气，结交新朋友，开启知识海洋的航行。',
                },
                {
                    image: '',
                    content: '成为小学生啦！愿你享受学习的乐趣，也珍惜课间的欢笑，健康快乐每一天。',
                },
                {
                    image: '',
                    content: '知识为你插上翅膀。愿你在书本里看见世界，在思考中收获智慧，好学亦好问。',
                },
                {
                    image: '',
                    content: '开始有自己的小主意，这很棒！愿你在尝试中学会选择，在挑战中懂得坚持。',
                },
                {
                    image: '',
                    content: '成长路上有晴亦有雨，愿你的笑容依旧灿烂，内心愈发坚强，朋友相伴左右。',
                    is: 'image-gallery',
                },
                {
                    image: '',
                    content: '十岁啦，人生第一个里程碑！愿你怀抱梦想，懂得感恩，一步步走向更广阔的天地。',
                    is: 'three-d',
                },
            ],
            currentPage: 0,
        }
    },
    mounted () {
    },
    created () {
        this.resize()
        window.addEventListener('resize', this.resize)
        Howler.init({
            volume: 1,
            autoplay: true,
            loop: true,
            html5: true,
        });
        document.body.addEventListener('click', this.mouseClick(), false)
        document.body.addEventListener('touchstart', this.mouseClick(), false)
    },
    destroyed () {
        window.removeEventListener('resize', this.resize)
        this.removeMouseDown()
    },
    methods: {
        resize () {
            // 处理窗口大小变化的逻辑
            if (window.innerWidth >= 1024) {
                // 大屏幕设备的逻辑
                console.log('大屏幕设备')
            } else {
                // 小屏幕设备的逻辑
                console.log('小屏幕设备')
            }
        },
        playMusic () {
            if (this.sound) {
                if (this.sound.playing()) {
                    return
                }
                this.sound.play();
            } else {
                this.sound = new Howl({
                    src: [require('../../static/audio/One-Direction-What-Makes-You-Beautiful.mp3')],
                    volume: 1.0,
                    loop: true,
                });
                this.sound.once('load', () => {
                    this.sound.play();
                    this.isOpen = true
                });
            }
        },
        mouseClick () {
            this.playMusic();
            // var player = document.getElementById("myMusic")
            // if (!player || player.playbackRate > 0) {
            //     return
            // }
            // player.muted = false
            // let ua = navigator.userAgent.toLowerCase()
            // this.$nextTick(() => {
            //     if (/iphone|ipad|ipod/.test(ua)) {
            //         // ios
            //         this.$refs.audioPlayer.src = ''
            //         this.$refs.audioPlayer.play()
            //     }
            //     this.$refs.audioPlayer.src = this.url
            //     this.$refs.audioPlayer.play()
            //     this.removeMouseDown()
            // })
        },
        removeMouseDown () {
            document.body.removeEventListener('click', this.mouseClick(), false)
            document.body.removeEventListener('touchstart', this.mouseClick(), false)
        },
        jump (paths) {
            /**
             * 跳转到paths
             * @param {string} paths - routes name
             */
            // this.$dialog.toast({ mes: "正在开发中", timeout: 1500 });
            this.$router.push({ path: paths })
        },
        onHide () {
            console.log('全屏层已隐藏')
            // 这里可以触发更复杂的状态管理，例如更新 Vuex 或父组件的状态
        }
    },
    computed: {},
    watch: {},
}
</script>
<style scoped lang="scss">
.main {
    background: linear-gradient(45deg, #fffbf0, #7fffd4, #161823);
    height: 100%;
    position: relative;
}

.bg-image {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 1;
}

/deep/.audio {
    width: 300px;
    height: 54px;
    position: absolute;
    bottom: 20px;
    left: 50%;
}

/deep/.van-swipe {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.my-swipe {
    box-sizing: border-box;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 100%;
    text-align: center;
    background-color: #00000000;
}

.swipe-container {
    width: 100%;
    height: 100%;
    position: relative;
}
.page-content {
    position: absolute;
    bottom: 10vh;
    width: 100%;
    padding: 0 5vw;
    box-sizing: border-box;
    font-size: 24px;
    line-height: 1.6;
    color: rgba(209, 44, 37, 1);
    text-shadow: 2px 2px 4px rgba(209, 44, 37, 0.5);
    z-index: 99;
}
</style>
