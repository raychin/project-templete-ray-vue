// src/directives/slideToHide.js
export const slideToHide = {
  mounted(el, binding) {
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;

    el.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isScrolling = true;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      if (!isScrolling) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // 主要响应向上滑动（deltaY为负），也可根据需求调整
      if (deltaY < -10) { // 轻微向上滑动即触发
        e.preventDefault(); // 阻止默认滚动行为，谨慎使用，可能影响其他滚动
        el.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: false }); // 因为可能阻止默认行为，所以 passive: false

    el.addEventListener('touchend', () => {
      if (!isScrolling) return;
      isScrolling = false;

      const deltaY = currentY - startY;
      const hideThreshold = el.offsetHeight / 4; // 隐藏阈值，例如滑动超过1/4高度

      if (deltaY < -hideThreshold) {
        // 满足隐藏条件，向上滑出屏幕
        el.style.transition = 'transform 0.3s ease-out';
        el.style.transform = 'translateY(-100vh)';
        
        // 可选的：动画结束后隐藏元素或触发回调
        setTimeout(() => {
          // el.style.display = 'none';
          if (binding.value && typeof binding.value === 'function') {
            binding.value(); // 调用传入的回调函数
          }
        }, 300);
      } else {
        // 不满足条件，恢复原位
        el.style.transition = 'transform 0.2s ease-out';
        el.style.transform = 'translateY(0)';
      }
    });
  }
};