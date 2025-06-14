import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }

    return { count, doubleCount, increment }
  },
  // {
  // 开启数据持久化
  // persist: true,
  // 持久化存储插件按需配置
  // persist: {
  //     // 修改存储中使用的键名称，默认为当前 Store的 id
  // key: 'counter',
  //     // 修改为 sessionStorage，默认为 localStorage
  // storage: window.sessionStorage,
  //     // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  // paths: ['count'],
  // },
  // },
)
