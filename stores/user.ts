import { ref } from 'vue'
import { defineStore } from 'pinia'

import { STORAGE_KEY } from '@/constants'
import { DESEncode, DESDecode } from '@/utils/crypto'

export default defineStore('user', () => {
  const token = uni.getStorageSync(STORAGE_KEY.TOKEN)
  const isFirstUse = ref(uni.getStorageSync(STORAGE_KEY.IS_FIRST_USE) ?? true)

  function setIsFirstUse(state) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: STORAGE_KEY.IS_FIRST_USE,
        data: state,
        success: () => {
          isFirstUse.value = state
          resolve(true)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  return {
    token,
    isFirstUse
  }
})
