<template>
  <view class="home">
    <BarNav />
    <SiwtchTab
      class="home__tab"
      :tabs="tabs"
      v-model:index="tabIndex"
      text-active-color="#334856"
      text-inactive-color="#b1b1b1"
      active-background-color="transparent"
      inactive-background-color="#E4E7E8"
    />
    <HomeContent />
    <TabBar />
  </view>
</template>

<script lang="ts" setup>
import { ref, shallowRef, computed } from 'vue'

import SiwtchTab from '@/components/switch-tab'
import BarNav from '@/widgets/bar-nav'
import TabBar from '@/widgets/tab-bar'
import HomeContent from './components/home-content'

const tabs = ['You', 'Friends']
const tabIndex = ref(1)
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__tab {
    flex-shrink: none;
  }
}
</style>
