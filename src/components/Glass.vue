<template>
  <div class="Glassmorphism relative">
    <div class="circle absolute top-0 left-0"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { addUnit } from '@/utils'
import { computed, defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
    radius?: string | number
  }>(),
  {
    width: '100%',
    height: '100%',
    radius: 12,
  },
)
const c_width = computed(() => addUnit(props.width))
const c_height = computed(() => addUnit(props.height))
const c_radius = computed(() => addUnit(props.radius))
</script>

<style lang="scss" scoped>
// 定义变量（更语义化）
$glass-radius: v-bind(c_radius);
$glass-width: v-bind(c_width);
$glass-height: v-bind(c_height);
$circle-diameter: calc($glass-radius * 2);

.Glassmorphism {
  // 基础样式
  position: relative; // 确保伪元素定位正确
  width: $glass-width;
  height: $glass-height;
  border-radius: $glass-radius;

  // 毛玻璃效果
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(6px);
  box-shadow: 0.8rem 0.8rem 1.3rem 0 rgba(0, 0, 0, 0.15);
  overflow: hidden; // 防止子元素溢出圆角

  // 圆形装饰元素
  > .circle {
    position: absolute;
    width: $circle-diameter;
    height: $circle-diameter;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.8); // 半透明边框更和谐
    clip: rect(0, $glass-radius, $glass-radius, 0);
    z-index: -1;
    opacity: 0.8; // 降低存在感避免喧宾夺主
  }

  // 边缘高光（伪元素优化）
  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9), transparent);
    pointer-events: none; // 避免干扰交互
  }

  // 顶部高光
  &::before {
    top: 0;
    left: $glass-radius;
    width: calc(100% - #{$circle-diameter});
    height: 1px;
  }

  // 左侧高光
  &::after {
    top: $glass-radius;
    left: 0;
    width: 1px;
    height: calc(100% - #{$circle-diameter});
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), transparent);
  }
}
</style>
