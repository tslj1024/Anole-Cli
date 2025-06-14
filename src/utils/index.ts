export const isDef = (val: unknown) => val !== undefined && val !== null //是否有值

export const isNumeric = (val: string) => /^\d+(\.\d+)?$/.test(val) // 是否是一个数字

export const addUnit = (val: string | number) => {
  // 默认添加px的单位
  if (!isDef(val)) {
    return undefined
  }
  val = String(val)
  return isNumeric(val) ? val + 'px' : val
}
