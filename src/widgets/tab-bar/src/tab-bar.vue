<template>
  <view class="tab-bar">
    <view class="tab-bar__icon-wrapper">
      <view
        :class="[
          'tab-bar__item',
          {
            'tab-bar__item--active': currentPageName === icon.name.toLowerCase()
          }
        ]"
        v-for="icon of iconList[0]"
        :key="icon.name"
        @click="itemClickHandler(icon.name.toLowerCase())"
      >
        <text class="tab-bar__icon" :class="icon.class"></text>
        <text class="tab-bar__text">{{ icon.name }}</text>
      </view>
    </view>
    <view class="tab-bar__wrapper-image">
      <image class="tab-bar__image" :src="Icon" />
    </view>
    <view class="tab-bar__icon-wrapper">
      <view
        :class="[
          'tab-bar__item',
          {
            'tab-bar__item--active': currentPageName === icon.name.toLowerCase()
          }
        ]"
        v-for="icon of iconList[1]"
        :key="icon.name"
        @click="itemClickHandler(icon.name.toLowerCase())"
      >
        <text class="tab-bar__icon" :class="icon.class"></text>
        <text class="tab-bar__text">{{ icon.name }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { tabBarProps } from '@/widgets/tab-bar/src/interface'

import Icon from '@/static/icons/icn_add_normal.png'

import '../style/tab-bar.scss'
import useProxyVModel from '@/hooks/useProxyVModel'

const props = defineProps(tabBarProps())

const currentPageName = useProxyVModel('currentPageName')

const iconList = [
  [
    {
      name: 'HOME',
      class: 'iconfont icon-zhuye'
    },
    {
      name: 'ACTIVITY',
      class: 'iconfont icon-dianboxindiantu'
    }
  ],
  [
    {
      name: 'DISCOVER',
      class: 'iconfont icon-sousuo'
    },
    {
      name: 'PROFILE',
      class: 'iconfont icon-yonghuguanli'
    }
  ]
]

function itemClickHandler(name: string) {
  if (currentPageName.value === name) {
    uni.$emit('click-same-tab', { name })
  } else {
    currentPageName.value = name
  }
}
</script>
