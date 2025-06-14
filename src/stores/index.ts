import { useCounterStore } from './counter'

// 统一导出 useStore 方法
export default function useStore() {
  return {
    counter: useCounterStore(),
  }
}
