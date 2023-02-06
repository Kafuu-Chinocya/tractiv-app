<template>
  <view class="sign-up">
    <CapsuleButton class="sign-up__button">
      <text class="iconfont icon-youxiang"></text>
      <text>SIGN UP WITH EMAIL</text>
    </CapsuleButton>
    <CapsuleButton class="sign-up__button" plain>
      SIGN UP WITH PHONE NUMBER
    </CapsuleButton>
  </view>
</template>

<script lang="ts" setup>
import CapsuleButton from '@/components/capsule-button'
</script>

<style lang="scss" scoped>
.sign-up {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 to-rpx(30);

  &__button {
    width: 100%;

    &:not(:first-child) {
      margin-top: to-rpx(25);
    }
  }
}
</style>
