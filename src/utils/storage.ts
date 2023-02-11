import { isEmptyString } from '@/utils/shared'

export function getStorageSync<T = any>(key: string): null | T {
  let result = null

  try {
    const val = uni.getStorageSync(key)
    result = isEmptyString(val) ? null : (val as T)
  } catch (e) {
    console.error(e)
  }

  return result
}

export function setStorageSync(key: string, data: any) {
  let result = true

  try {
    uni.setStorageSync(key, data)
  } catch (e) {
    result = false
    console.error(e)
  }

  return result
}
