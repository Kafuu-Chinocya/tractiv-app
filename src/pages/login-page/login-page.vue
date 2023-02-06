<template>
  <view class="login-page">
    <view class="login-page__top">
      <image class="login-page__logo" :src="Logo" mode="aspectFit"></image>
      <view class="login-page__content">
        <text class="primary-heading">Create a</text>
        <text class="primary-heading">New Account</text>
        <view class="login-page__content--split"></view>
        <text class="sub-title">For the best experience</text>
        <text class="sub-title">with Tractiv</text>
      </view>
    </view>
    <view class="login-page__bottom">
      <SiwtchTab
        class="login-page__tab"
        :tabs="tabs"
        v-model:index="tabIndex"
        text-active-color="var(--color-snow)"
        text-inactive-color="#516a7b"
        active-background-color="transparent"
        inactive-background-color="transparent"
      />
      <component class="login-page__bottom--view" :is="computedComponent" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, shallowRef, computed } from 'vue'

import SiwtchTab from '@/components/switch-tab'
import SignUp from './components/sign-up.vue'
import LogIn from './components/log-in.vue'

import Logo from '@/static/logo/logo_stacked_color.png'

const tabs = shallowRef(['Sign Up', 'Log In'])
const tabIndex = ref(0)
const tabComponents = [{ component: SignUp }, { component: LogIn }] as const

const computedComponent = computed(
  () => tabComponents[tabIndex.value].component
)
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: var(--status-bar-height);
  background-color: var(--color-drab);

  &__top {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5.9%;
  }

  &__logo {
    height: to-rpx(78);
    align-self: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 16% 0 16.5% to-rpx(70);
    color: var(--color-snow);

    &--split {
      width: to-rpx(33);
      margin: to-rpx(16) 0;
      border: 1px solid var(--color-snow);
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    flex: 1;

    &--view {
      flex: 1;
    }
  }

  &__tab {
    flex-shrink: 0;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
