<template>
  <scroll-view
    id="friends-content"
    scroll-y
    scroll-with-animation
    :scroll-top="scrollTop"
    @scroll="scrollHandler"
    @scrolltolower="getRemoteData"
  >
    <view class="friends">
      <MessageCard
        class="friends__message-card"
        v-for="(item, idx) of list"
        :key="idx"
        :data="item"
      />
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, onMounted, onBeforeUnmount, nextTick } from 'vue'

import { getRandomUserInfo } from '@/apis'
import { getStorageSync, setStorageSync } from '@/utils/storage'
import { STORAGE_KEY } from '@/constants'

import MessageCard from './message-card.vue'

const oldScrollTop = ref(0)
const scrollTop = ref(0)
const list = reactive<anyObj[]>(getStorageSync(STORAGE_KEY.MAIN_FRIENDS) ?? [])

function scrollHandler(e: anyObj) {
  oldScrollTop.value = e.detail.scrollTop
}

function getRemoteData() {
  getRandomUserInfo({
    success(response) {
      const result = response.data as anyObj

      list.push(
        ...result.results.map(({ name, picture }: anyObj) => {
          const now = new Date()

          return {
            name: `${name.title}.${name.first} ${name.last}`,
            avatar: picture.medium,
            time: `Today at ${now.getHours()}:${now.getMinutes()}`,
            message:
              'We supply a series of design principles, practical ' +
              'patterns and high quality design resources (Sketch and Axure), ' +
              'to help people create their product prototypes beautifully and ' +
              'efficiently.'
          }
        })
      )
    }
  })
}

if (unref(list).length === 0) {
  getRemoteData()
}

uni.$on('click-same-tab', () => {
  scrollTop.value = oldScrollTop.value

  nextTick(() => {
    scrollTop.value = 0
  })
})

onBeforeUnmount(() => {
  setStorageSync(STORAGE_KEY.MAIN_FRIENDS, unref(list))
  uni.$off('click-same-tab')
})
</script>

<style lang="scss" scoped>
.friends {
  display: flex;
  flex-direction: column;
  padding: to-rpx(18);

  &__message-card:not(:first-child) {
    margin-top: to-rpx(20);
  }
}
</style>
