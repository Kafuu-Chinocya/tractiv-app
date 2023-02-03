import { isEmptyString } from '@/utils/shared'

export function getStorageSync<T = any>(key: string): null | T {
  const val = uni.getStorageSync(key)

  return isEmptyString(val) ? null : (val as T)
}
