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
    <view class="login-page__bottom">
      {{ user.token }}
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

import useUser from '@/stores/user'

import SiwtchTab from '@/components/switch-tab'
import SignUp from './components/sign-up.vue'
import LogIn from './components/log-in.vue'

import Logo from '@/static/logo/logo-stacked-color.png'

const user = useUser()

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
    display: flex;
    flex-direction: column;
    height: to-rpx(264);

    &--view {
      flex: 1;
    }
  }

  &__tab {
    flex-shrink: none;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
