<template>
  <view class="bar-nav">
    <view class="bar-nav__wrapper">
      <text
        class="bar-nav__icon iconfont icon-duanluo"
        @click="openDrawer"
      ></text>
      <image class="bar-nav__logo" :src="Logo" />
      <uni-badge
        size="small"
        :text="2"
        absolute="rightTop"
        :custom-style="badgeStyle"
      >
        <text class="bar-nav__icon iconfont icon-24gl-drawer"></text>
      </uni-badge>
    </view>

    <MenuExpand v-model="visible" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import MenuExpand from '@/widgets/menu-expand'

import Logo from '@/static/logo/logo_header_wide.png'

import '../style/bar-nav.scss'

const badgeStyle = {
  borderWidth: '2px',
  backgroundColor: 'var(--color-sage)'
}
const visible = ref(false)

function openDrawer() {
  visible.value = true
}
</script>
