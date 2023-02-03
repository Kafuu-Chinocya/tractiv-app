import { ref } from 'vue'
import { defineStore } from 'pinia'

import { STORAGE_KEY } from '@/constants'
import { DESEncode, DESDecode } from '@/utils/crypto'

export default defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo | null>(
    uni.getStorageSync(STORAGE_KEY.USERINFO) ?? null
  )
  // 是否首次登录
  const isFirstUse = ref(uni.getStorageSync(STORAGE_KEY.IS_FIRST_USE) ?? true)

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

  return {
    userInfo,
    isFirstUse,
    setUserInfo,
    setIsFirstUse
  }
})
