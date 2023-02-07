<template>
  <scroll-view scroll-y @scrolltolower="getRemoteData">
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
import { reactive } from 'vue'

import MessageCard from './message-card.vue'

const list = reactive<anyObj>([])

function getRemoteData() {
  uni.showLoading({
    title: 'Loading ...',
    mask: true
  })
  uni.request({
    url: 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo',
    success(res) {
      const result = res.data as anyObj

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
    },
    complete() {
      uni.hideLoading()
    }
  })
}

getRemoteData()
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
