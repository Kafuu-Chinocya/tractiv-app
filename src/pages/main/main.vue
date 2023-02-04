<template>
  <view class="main">
    <BarNav
      v-model:current-page-name="currentPageName"
      @open-new-page="openNewPageHandler"
    />
    <view class="main__content">
      <component :is="currentComponent" />
    </view>
    <TabBar v-model:current-page-name="currentPageName" />
  </view>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue'

import BarNav from '@/widgets/bar-nav'
import TabBar from '@/widgets/tab-bar'
import Home from './subpages/home/home.vue'
import Activity from './subpages/activity/activity.vue'
import Discover from './subpages/discover/discover.vue'
import Profile from './subpages/profile/profile.vue'

const homeSubPageMap = {
  home: {
    component: Home
  },
  activity: {
    component: Activity
  },
  discover: {
    component: Discover
  },
  profile: {
    component: Profile
  }
} as const
const newPageMap = {
  'track activity': {
    url: '/pages/app-tutorial-page/app-tutorial-page'
  },
  settings: {
    url: '/pages/app-tutorial-page/app-tutorial-page'
  }
}
const currentPageName = ref<keyof typeof homeSubPageMap>('home')
const currentComponent = shallowRef<string | anyObj>('')

function openNewPageHandler(pageName: keyof typeof newPageMap) {
  const config = newPageMap[pageName]

  uni.navigateTo({
    url: config.url
  })
}

watch(
  currentPageName,
  (name) => {
    const config = homeSubPageMap[name]
    currentComponent.value = config.component
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__content {
    flex: 1;
    //padding-bottom: var(--tab-bar-height);
    overflow: hidden;
    box-sizing: border-box;
  }
}
</style>
