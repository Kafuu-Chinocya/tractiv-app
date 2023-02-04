<template>
  <view class="tab-bar">
    <view>
      <view v-for="icon of iconList[0]" :key="icon.name">
        <text :class="icon.class"></text>
        <text>{{ icon.name }}</text>
      </view>
      <view></view>
    </view>
    <view><image /></view>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
const iconList = [
  [
    {
      name: 'HOME',
      class: 'iconfont icon-zhuye'
    }
  ],
  [
    {
      name: 'ACTIVITY',
      class: 'iconfont icon-dianboxindiantu'
    }
  ]
]
</script>

<style lang="scss" scoped></style>
