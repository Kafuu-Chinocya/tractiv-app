<template>
  <view class="friends">
    <MessageCard />
  </view>
</template>

<script lang="ts" setup>
import MessageCard from './message-card.vue'
;('https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo')
</script>

<style lang="scss" scoped>
.friends {
  padding: to-rpx(18);
}
</style>
