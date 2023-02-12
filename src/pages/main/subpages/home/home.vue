<template>
  <view class="home">
    <SwitchTab
      class="home__tab"
      :tabs="tabs"
      v-model:index="tabIndex"
      text-active-color="#334856"
      text-inactive-color="#b1b1b1"
      active-background-color="transparent"
      inactive-background-color="#E4E7E8"
    />

    <swiper
      class="home__content"
      :current="tabIndex"
      skip-hidden-item-layout
      @change="swiperChangeHandler"
    >
      <swiper-item v-for="(component, idx) of tabComponents" :key="tabs[idx]">
        <component class="home__content-wrapper" :is="component" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import SwitchTab from '@/components/switch-tab'
import You from './components/you.vue'
import Friends from './components/friends.vue'

const tabs = ['You', 'Friends']
const tabComponents = [You, Friends]
const tabIndex = ref(1)

function swiperChangeHandler(e: UniEvent) {
  tabIndex.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__content {
    flex: 1;
    overflow: hidden;
    background-color: var(--color-ice);

    &-wrapper {
      height: 100%;
    }
  }
}
</style>
