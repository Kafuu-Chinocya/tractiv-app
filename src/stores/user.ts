import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getStorageSync } from '@/utils/storage'
import { STORAGE_KEY } from '@/constants'

export default defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo | null>(
    getStorageSync(STORAGE_KEY.USERINFO) ?? null
  )
  // 是否首次登录
  const isFirstUse = ref(getStorageSync(STORAGE_KEY.IS_FIRST_USE) ?? true)

  function setUserInfo(payload: UserInfo) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: STORAGE_KEY.USERINFO,
        data: payload,
        success: () => {
          userInfo.value = payload
          resolve(true)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  function setIsFirstUse(payload: boolean) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: STORAGE_KEY.IS_FIRST_USE,
        data: payload,
        success: () => {
          isFirstUse.value = payload
          resolve(true)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  function removeIsFirstUseState() {
    uni.removeStorageSync(STORAGE_KEY.IS_FIRST_USE)
    isFirstUse.value = true
  }

  function removeUserInfo() {
    uni.removeStorageSync(STORAGE_KEY.USERINFO)
    userInfo.value = null
  }

  return {
    userInfo,
    isFirstUse,
    setUserInfo,
    setIsFirstUse,
    removeIsFirstUseState,
    removeUserInfo
  }
})
