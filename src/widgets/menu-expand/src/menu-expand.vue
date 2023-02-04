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
          v-for="item of menuList"
          :key="item.name"
          :class="[
            'menu-expand__menu--item',
            {
              'menu-expand__menu--item-active':
                currentPageName === item.name.toLowerCase()
            }
          ]"
          @click="itemClickHandler(item)"
        >
          {{ item.name }}
        </text>
      </view>

      <image class="menu-expand__logo" :src="Logo" />
    </view>
  </uni-drawer>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect, ref } from 'vue'

import { menuExpandProps } from './interface'
import useProxyVModel from '@/hooks/useProxyVModel'

import Logo from '@/static/logo/logo_header_wide.png'

import '../style/menu-expand.scss'

const props = defineProps(menuExpandProps())
const emit = defineEmits([
  'open-new-page',
  'update:visible',
  'update:currentPageName'
])

const drawerInstance = ref<null | anyObj>(null)
const visible = useProxyVModel('visible')
const currentPageName = useProxyVModel('currentPageName')
const menuList = [
  { name: 'Home', type: 'subpage' },
  { name: 'Discover', type: 'subpage' },
  { name: 'Profile', type: 'subpage' },
  { name: 'Track Activity', type: 'page' },
  { name: 'Settings', type: 'page' }
]

function drawerChangeHandler(val: boolean) {
  visible.value = val
}

function close() {
  drawerChangeHandler(false)
}

function itemClickHandler(item: (typeof menuList)[number]) {
  close()

  const name = item.name.toLowerCase()
  if (item.type === 'subpage') {
    currentPageName.value = name
  } else {
    emit('open-new-page', name)
  }
}

onMounted(() => {
  watchEffect(() => {
    if (!drawerInstance.value) return

    drawerInstance.value[visible.value ? 'open' : 'close']()
  })
})
</script>
