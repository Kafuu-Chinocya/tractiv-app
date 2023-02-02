<template>
  <view class="login-page">
    <view class="login-page__top">
      <image class="login-page__logo" :src="Logo"></image>
      <view class="login-page__content">
        <text class="primary-heading">Create a New Account</text>
        <view class="login-page__content--split"></view>
        <text class="start-page__primary-text">
          For the best experience with Tractiv
        </text>
      </view>
    </view>
    <view class="login-page__bottom"> </view>
  </view>
</template>

<script lang="ts" setup>
import Logo from '@/static/logo/logo-stacked-color.png'
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-drab);

  &__top {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__logo {
    width: to-rpx(118);
    height: to-rpx(78);
    align-self: center;
  }

  &__content {
    width: to-rpx(200);
    padding: to-rpx(76) 0 to-rpx(120) to-rpx(70);
    color: var(--color-snow);

    &--split {
      width: to-rpx(33);
      margin: to-rpx(16) 0;
      border: 1px solid var(--color-snow);
    }
  }

  &__bottom {
    height: to-rpx(264);
    background-color: red;
  }
}
</style>
