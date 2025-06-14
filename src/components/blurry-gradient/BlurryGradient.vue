<template>
  <div class="blurry-gradient-container" :class="props.className" :style="containerStyle">
    <div
      v-for="(item, index) in itemDetailList"
      :key="index"
      class="blurry-gradient-block"
      :style="item.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  random,
  randomBorderRadius,
  randomGradientColor,
  randomPercent,
  randomTransform,
} from './random'
import type { BlurryGradientItemProps } from './types'

const props = defineProps({
  itemNumber: {
    type: Number,
    default: 10,
  },
  itemWidth: {
    type: Array<number>,
    default: () => [60, 80],
  },
  itemWidthUnit: {
    type: String,
    default: '%',
  },
  itemHeightUnit: {
    type: String,
    default: '%',
  },
  itemHeight: {
    type: Array<number>,
    default: () => [60, 80],
  },
  itemTop: {
    type: Array<number>,
    default: () => [20, 60],
  },
  itemLeft: {
    type: Array<number>,
    default: () => [20, 60],
  },
  itemSpeed: {
    type: Array<number>,
    default: () => [50, 80],
  },
  colors: {
    type: Array<string>,
    default: null,
  },
  items: {
    type: Array<BlurryGradientItemProps>,
    default: null,
  },
  className: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: () => ({}),
  },
  blur: {
    type: String,
    default: '',
  },
})

const containerStyle = computed(() => ({
  ...props.style,
  '--blur': props.blur,
}))

const itemDetailList = computed(() => {
  const getItemStyle = (item: BlurryGradientItemProps) => {
    return {
      style: {
        '--width':
          item.width ?? random(props.itemWidth[0], props.itemWidth[1]) + props.itemWidthUnit,
        '--height':
          item.height ?? random(props.itemHeight[0], props.itemHeight[1]) + props.itemHeightUnit,
        '--speed': item.speed ?? random(props.itemSpeed[0], props.itemSpeed[1]) + 's',
        '--color': item.color,
        '--top': item.top ?? randomPercent(props.itemTop[0], props.itemTop[1]),
        '--left': item.left ?? randomPercent(props.itemLeft[0], props.itemLeft[1]),
        '--border-radius': randomBorderRadius(),
        '--transform-from': item.transformFrom ?? randomTransform(),
        '--transform-to': item.transformTo ?? randomTransform(),
      },
    }
  }

  if (props.colors) {
    const colorItems = Array.from({ length: props.itemNumber }).map(() => {
      return {
        color: randomGradientColor(props.colors),
      }
    })

    return colorItems.map(getItemStyle)
  }

  if (!props.items) {
    return []
  }

  return props.items.map(getItemStyle)
})
</script>

<style scoped>
.blurry-gradient-container {
  --blur: 100px;

  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  filter: blur(var(--blur));
}

@keyframes gradient-move {
  0% {
    transform: var(--transform-from);
  }

  100% {
    transform: var(--transform-to);
  }
}

.blurry-gradient-block {
  position: absolute;
  top: var(--top);
  left: var(--left);
  background-image: var(--color);
  animation: gradient-move var(--speed) cubic-bezier(0.8, 0.2, 0.2, 0.8) alternate infinite;
  border-radius: var(--border-radius);
  width: var(--width);
  height: var(--height);
}
</style>
