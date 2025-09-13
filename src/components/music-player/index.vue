<!--
 * @Author: your name
 * @Date: 2020-09-08 10:32:58
 * @LastEditTime: 2025-09-13 14:13:25
 * @LastEditors: ray ray.chin@163.com
 * @Description: 音符
 * @FilePath: /project-templete-ray-vue/src/components/music-player/index.vue
-->
<template>
    <div id="audio_btn" class="video_exist play_yinfu" style="display: block;">
        <div id="yinfu" class="rotate"></div>
        <!-- <audio id="myMusic" ref="audioPlayer" loop autoplay style="" muted="true">
            <source src="../../static/audio/1_Legends.wav" type="audio/mpeg">
            你的浏览器不支持 audio 元素。
        </audio> -->
        <!-- <audio id="myMusic" src="../../static/audio/1_Legends.wav" loop="loop" style="" autoplay="autoplay"></audio> -->
    </div>
</template>
<script>
import { Howl, Howler } from 'howler';
export default {
    name: "music-player",
    data () {
        return {
            sound: null,
        }
    },
    mounted () {
        var audio_btn = document.getElementById("audio_btn");
        var yinfu = document.getElementById("yinfu");
        var player = document.getElementById("myMusic");
        audio_btn.addEventListener("click", function () {
            if (player.paused) {
                player.play();
                yinfu.classList.add("rotate");
            } else {
                player.pause();
                yinfu.classList.remove("rotate");
            }
        });
        // Howler.init({
        //     volume: 1,
        //     autoplay: true,
        //     loop: true,
        //     html5: true,
        // });
        // this.playMusic();
    },
    created () {
        // document.body.addEventListener('mousedown', () => {
        //     var player = document.getElementById("myMusic");
        //     player.muted = false;
        //     this.$nextTick(() => {
        //         this.$refs.audioPlayer.src = this.url;
        //         this.$refs.audioPlayer.play();
        //     });
        // }, false);
    },
    methods: {
        playMusic () {
            if (this.sound) {
                this.sound.play();
            } else {
                this.sound = new Howl({
                    src: [require('../../static/audio/1_Legends.wav')],
                    volume: 1.0,
                    loop: true,
                });
                this.sound.once('load', () => {
                    this.sound.play();
                });
            }
        },
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
.music {
    width: 20px;
    height: 30px;
    background: url(./img/basic/music.gif)no-repeat;
    position: absolute;
    top: 20px;
    right: 20px;
    background-size: 100%;
}

#audio_btn {
    background-repeat: no-repeat;
    cursor: pointer;
    display: none;
    height: 60px;
    position: absolute;
    width: 60px;
    z-index: 200;
    right: 0;
}

#audio_btn {
    background-repeat: no-repeat;
    cursor: pointer;
    display: none;
    height: 60px;
    position: absolute;
    width: 60px;
    z-index: 200;
}

.video_exist.play_yinfu {
    background-image: url("./img/basic/music.gif");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 60px 60px;
}

.video_exist.play_yinfu {
    background-image: url("./img/basic/music.gif");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 60px 60px;
}

#yinfu.rotate {
    animation: 1.2s linear 0s normal none infinite running rotating;
    background-image: url("./img/basic/music_off.png");
    background-size: 100% 100%;
    height: 34px;
    left: 13px;
    position: absolute;
    top: 13px;
    width: 34px;
}

#yinfu.rotate {
    animation: 1.2s linear 0s normal none infinite running rotating;
    background-image: url("./img/basic/music_off.png");
    background-size: 100% 100%;
    height: 34px;
    left: 13px;
    position: absolute;
    top: 13px;
    width: 34px;
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>