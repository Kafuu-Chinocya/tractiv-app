<template>
  <view>
    <button @click="logout">Log out</button>
  </view>
</template>

<script lang="ts" setup>
import useUser from '@/stores/user'

const user = useUser()

function logout() {
  user.removeIsFirstUseState()
  user.removeUserInfo()
  uni.reLaunch({ url: '/pages/login-page/login-page' })
}
</script>
