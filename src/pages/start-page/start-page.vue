<template>
  <view v-if="!user.userInfo" class="start-page">
    <view class="start-page__header">
      <image class="start-page__logo" :src="Logo"></image>
    </view>
    <view class="start-page__content">
      <text class="primary-heading">Track Your</text>
      <text class="primary-heading">Active Lifestyle</text>
      <view class="start-page__content--split"></view>
      <text class="sub-title">With goal a driven approach</text>
    </view>

    <GuideButton
      @click="buttonClickHandler"
      backgroundColor="var(--color-rust)"
      color="var(--color-snow)"
      icon="iconfont icon-xiangyou1"
    >
      GET STARTED
    </GuideButton>
  </view>
</template>

<script lang="ts" setup>
import useUser from '@/stores/user'

import GuideButton from '@/components/guide-button'

import Logo from '@/static/logo/logo_stacked_white.png'

const user = useUser()

function buttonClickHandler() {
  uni.navigateTo({
    url: '/pages/login-page/login-page'
  })
}
</script>

<style lang="scss" scoped>
.start-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-drab);

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: to-rpx(434);
    background-image: url('~@/static/images/image_20.png');
    background-size: cover;
    background-position: center center;
  }

  &__logo {
    width: to-rpx(207);
    height: to-rpx(136);
    margin-bottom: to-rpx(75);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: to-rpx(90) 0 to-rpx(109) to-rpx(48);
    color: var(--color-snow);

    &--split {
      width: to-rpx(33);
      margin: to-rpx(16) 0;
      border: 1px solid var(--color-snow);
    }
  }
}
</style>
