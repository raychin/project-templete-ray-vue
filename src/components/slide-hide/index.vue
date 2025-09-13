<!--
 * @Author: ray ray.chin@163.com
 * @Date: 2025-09-06 14:26:48
 * @LastEditors: ray ray.chin@163.com
 * @LastEditTime: 2025-09-13 14:42:59
 * @FilePath: /project-templete-ray-vue/src/components/slide-hide/index.vue
 * @Description: 滑动组件
 * 
 * Copyright (c) 2025 by ray, All Rights Reserved.
-->
<template>
    <!-- 使用 transition 组件实现平滑动画 -->
    <transition name="slide-up">
        <div
            id="parent"
            v-show="isVisible"
            class="fullscreen-overlay"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @mousedown="onTouchStart"
            @mousemove="onTouchMove"
            @mouseup="onTouchEnd"
            @mouseleave="onTouchEnd"
            @touchstart.stop
            @mousedown.stop
            draggable="true"
        >
            <!-- 你的内容放在这里 -->
            <div class="content">
                <div id="typewriter-container" draggable="false" style="font-family: monospace; line-height: 1.6;">
                </div>
                <div class="slide-hint">
                    <div class="arrow-container">
                        <img src="../../static/img/arrow_up_double.png" alt="向上滑动提示" class="arrow-up" draggable="false">
                        <p class="arrow-up" draggable="false">向上滑动我即可开始</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "slide-hide",
    data () {
        return {
            // 控制显示/隐藏
            isVisible: true,
            // 触摸起始Y坐标
            startY: 0,
            // 当前Y坐标
            currentY: 0,
            // 是否正在滑动
            isScrolling: false,
            lines: [
                "十岁，是青春的开始，是梦想的启航。",
                "愿你站在自己热爱的世界里闪闪发光。",
                "愿你未来的每一天都充满阳光、快乐和无限可能。"
            ],
        }
    },
    created () {
    },
    mounted () {
        document.getElementById('parent').addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
        this.typeWriter();
    },
    methods: {
        onTouchStart (event) {
            this.isScrolling = true
            // 记录初始触摸位置
            // this.startY = event.touches[0].clientY
            this.startY = event.touches ? event.touches[0].clientY : event.clientY
        },
        onTouchMove (event) {
            if (!this.isScrolling) return
            // this.currentY = event.touches[0].clientY
            this.currentY = event.touches ? event.touches[0].clientY : event.clientY;
            const deltaY = this.currentY - this.startY

            // 主要响应向上滑动（deltaY为负）
            if (deltaY < -10) {
                // 可选的：在滑动过程中实时移动元素
                event.target.style.transform = `translateY(${deltaY}px)`
            }
        },
        onTouchEnd () {
            this.isScrolling = false
            const deltaY = this.currentY - this.startY
            // 触发隐藏的滑动距离阈值
            const hideThreshold = 160

            // 如果向上滑动距离超过阈值，则隐藏
            if (deltaY < -hideThreshold) {
                this.isVisible = false
                // 触发隐藏事件
                this.$emit('onHide')
            } else {
                // 否则恢复位置
                const content = this.$el
                content.style.transition = 'transform 0.3s ease-out'
                content.style.transform = 'translateY(0)'
                setTimeout(() => {
                    content.style.transition = ''
                }, 300)
            }
        },
        typeWriter() {
            const container = document.getElementById('typewriter-container');
            let lineIndex = 0;
            let charIndex = 0;
            const lines = this.lines;

            function typeNextLine() {
                if (lineIndex >= lines.length) return; // 所有行都打印完毕

                const lineDiv = document.createElement('div');
                lineDiv.className = 'js-typewriter-line';
                container.appendChild(lineDiv);

                typeNextCharacter(lines[lineIndex], lineDiv);
            }

            function typeNextCharacter(text, element) {
                if (charIndex < text.length) {
                    element.textContent += text[charIndex];
                    charIndex++;
                    setTimeout(() => typeNextCharacter(text, element), 100); // 调整速度
                } else {
                    // 当前行结束，重置字符索引，开始下一行
                    charIndex = 0;
                    lineIndex++;
                    setTimeout(typeNextLine, 500); // 行与行之间的延迟
                }
            }
            // 开始动画
            typeNextLine();
        }
    },
    computed: {},
    watch: {},
}
</script>
<style scoped lang="scss">
/* 全屏覆盖层样式 */
.fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    /* 半透明背景 */
    z-index: 9999;
    /* 确保在最上层 */
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
    /* 防止默认触摸行为，避免干扰 */
    user-select: none;
}

/* 向上滑出的过渡动画 */
.slide-up-leave-active {
    transition: transform 0.4s ease-out;
}

.slide-up-leave-to {
    transform: translateY(-100%);
    /* 向上滑出视口 */
}

.content {
    color: #f0fcff;
    font-size: 18px;
    text-align: center;
    padding-top: 50%;
    width: 100%;
    pointer-events: none;
}

.slide-hint {
    margin-top: 24px;
    z-index: 9998;

    >p {
        width: 80%;
        text-align: center;
        margin: 16px auto 8px;
        word-break: break-word;
        font-size: 16px;
        color: #fcefe8;
    }
    >img {
        width: 32px;
        height: 32px;
        animation: bounce 2s infinite;
    }
}

.arrow-container {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    /* 初始状态为透明 */
    opacity: 0;
    /* 应用动画，3秒内完成，且保持在结束状态 */
    animation: fadeIn 10s ease-in-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.arrow-up {
    /* width: 24px; */
    height: 24px;
    /* 无限循环 */
    animation: slideUpFade 1.5s infinite ease-in-out;
}

/* 定义关键帧动画 */
@keyframes slideUpFade {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        /* 向上移动 */
        transform: translateY(-15px);
        opacity: 0.7;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
}

.typewriter {
    overflow: hidden;
    /* 光标效果 */
    border-right: 3px solid;
    white-space: nowrap;
    animation: typewriter 2s steps(20) infinite;
}

@media screen and (min-width: 687px) {
    .content {
        padding-top: 25%;
        font-size: 28px;
    }
}
@media screen and (min-width: 1024px) {
    .content {
        padding-top: 25%;
        font-size: 28px;
    }
}
</style>