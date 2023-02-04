<template>
  <uni-drawer
    class="menu-expand"
    ref="drawerInstance"
    @change="drawerChangeHandler"
  >
    <view class="menu-expand__wrapper">
      <text
        @click="close"
        class="menu-expand__close-btn iconfont icon-guanbi"
      ></text>

      <view class="menu-expand__menu">
        <text
          class="menu-expand__menu--item"
          v-for="item of menuList"
          :key="item.name"
          @click="itemClickHandler(item.url)"
        >
          {{ item.name }}
        </text>
      </view>

      <image class="menu-expand__logo" :src="Logo" />
    </view>
  </uni-drawer>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect, ref, computed } from 'vue'

import { menuExpandProps } from './interface'
import useProxyVModel from '@/hooks/useProxyVModel'

import Logo from '@/static/logo/logo_header_wide.png'

import '../style/menu-expand.scss'

const props = defineProps(menuExpandProps())

const drawerInstance = ref<null | anyObj>(null)
const visible = useProxyVModel('modelValue')
const menuList = [
  {
    name: 'Home',
    url: '/pages/home/home'
  },
  {
    name: 'Discover',
    url: '/pages/app-tutorial-page/app-tutorial-page'
  },
  {
    name: 'Profile',
    url: ''
  },
  {
    name: 'Track Activity',
    url: ''
  },
  {
    name: 'Settings',
    url: ''
  }
]
const router = getCurrentPages()
const currentUrl = computed(() => {
  const currentPage = router[router.length - 1]
  return currentPage?.$page.path
})

function drawerChangeHandler(val: boolean) {
  visible.value = val
}

function close() {
  visible.value = false
}

function itemClickHandler(url: string) {
  const router = getCurrentPages()
  const currentPage = router[router.length - 1]
  console.log(currentUrl.value)

  if (currentPage && currentPage.$page.path === url) {
    return drawerChangeHandler(false)
  }

  drawerChangeHandler(false)
  uni.navigateTo({ url })
}

onMounted(() => {
  watchEffect(() => {
    if (!drawerInstance.value) return

    drawerInstance.value[visible.value ? 'open' : 'close']()
  })
})
</script>
