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

    <MenuExpand
      v-model:visible="visible"
      v-model:current-page-name="currentPageName"
      @open-new-page="openNewPageHandler"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { barNavProps } from '@/widgets/bar-nav/src/interface'

import MenuExpand from '@/widgets/menu-expand'
import useProxyVModel from '@/hooks/useProxyVModel'

import Logo from '@/static/logo/logo_header_wide.png'

import '../style/bar-nav.scss'

const props = defineProps(barNavProps())
const emit = defineEmits(['open-new-page'])

const badgeStyle = {
  borderWidth: '2px',
  backgroundColor: 'var(--color-sage)'
}
const visible = ref(false)
const currentPageName = useProxyVModel('currentPageName')

function openDrawer() {
  visible.value = true
}

function openNewPageHandler(pageName: string) {
  emit('open-new-page', pageName)
}
</script>
