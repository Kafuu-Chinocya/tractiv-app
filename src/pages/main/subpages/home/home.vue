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

    <scroll-view class="home__content" scroll-y>
      <component :is="computedComponent.component" />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import SwitchTab from '@/components/switch-tab'
import You from './components/you.vue'
import Friends from './components/friends.vue'

const tabs = ['You', 'Friends']
const tabComponents = [You, Friends]
const tabIndex = ref(1)
const computedComponent = computed(() => ({
  component: tabComponents[tabIndex.value]
}))
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__content {
    flex: 1;
    background-color: var(--color-ice);
  }
}
</style>
