<template>
  <view class="app-tutorial-page">
    <view class="app-tutorial-page__button">
      <text @click="done">SKIP</text>
    </view>

    <view class="app-tutorial-page__next">
      <CapsuleButton @click="next">
        {{ current === maxIdx ? 'DONE' : 'NEXT' }}
      </CapsuleButton>
    </view>

    <swiper
      class="app-tutorial-page__swiper"
      indicator-dots
      indicator-active-color="var(--color-snow)"
      :current="current"
      @change="swiperChangeHandler"
    >
      <swiper-item v-for="(item, idx) of itemList" :key="idx">
        <view
          class="app-tutorial-page__item"
          :style="{ backgroundColor: item.backgroundColor }"
        >
          <view class="app-tutorial-page__item--top">
            <view class="app-tutorial-page__item--title primary-heading">
              <text>{{ item.title[0] }}</text>
              <text>{{ item.title[1] }}</text>
            </view>
            <view class="app-tutorial-page__item--split"></view>
            <text class="sub-title">{{ item.subtitle }}</text>
          </view>

          <image
            :class="['app-tutorial-page__image', item.imageClass]"
            :src="item.image"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import CapsuleButton from '@/components/capsule-button'

import Image1 from '@/static/images/card_surfing.png'
import Image2 from '@/static/images/icn_add.png'
import Image3 from '@/static/images/image.png'

const itemList = reactive([
  {
    title: ['Add Your', 'Favorite Activities'],
    subtitle: 'To Your Personalized Profile',
    backgroundColor: 'var(--color-sand)',
    image: Image1,
    imageClass: 'app-tutorial-page__image1'
  },
  {
    title: ['Add Your', 'Favorite Activities'],
    subtitle: 'To Your Personalized Profile',
    backgroundColor: 'var(--color-rust)',
    image: Image2,
    imageClass: 'app-tutorial-page__image2'
  },
  {
    title: ['Add Your', 'Favorite Activities'],
    subtitle: 'To Your Personalized Profile',
    backgroundColor: 'var(--color-sage)',
    image: Image3,
    imageClass: 'app-tutorial-page__image3'
  }
])
const current = ref(0)
const maxIdx = itemList.length - 1

function swiperChangeHandler(event: UniEvent) {
  current.value = event.detail.current
}

function next() {
  if (current.value !== maxIdx) {
    current.value += 1
  } else {
    done()
  }
}

function done() {
  uni.reLaunch({
    url: '/pages/home/home'
  })
}
</script>

<style lang="scss" scoped>
.app-tutorial-page {
  position: relative;
  width: 100%;
  height: 100vh;

  &__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: var(--status-bar-height);
    left: 0;
    z-index: 1;
    width: 100%;
    height: to-rpx(30);
    padding: 0 to-rpx(25);
    font-size: var(--button-label);
    color: var(--color-onyx);
    box-sizing: border-box;
  }

  &__next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: to-rpx(67);
    z-index: 1;
  }

  :deep(.uni-swiper-dots-horizontal) {
    bottom: to-rpx(213);
  }

  &__swiper {
    height: 100%;
  }

  &__item {
    display: flex;
    flex-direction: column;
    padding-top: calc(var(--status-bar-height) + to-rpx(65 + 30));
    height: 100%;

    &--top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: to-rpx(15);
      text-align: center;
      color: var(--color-snow);
    }

    &--title {
      color: var(--color-snow);
    }

    &--split {
      width: to-rpx(33);
      border: 1px solid var(--color-snow);
    }
  }

  &__image {
    padding-top: to-rpx(76);
  }

  &__image1 {
    width: to-rpx(457);
    height: to-rpx(199);
    padding-left: to-rpx(35);
  }

  &__image2 {
    align-self: center;
    width: to-rpx(240);
    height: to-rpx(240);
  }

  &__image3 {
    width: to-rpx(347);
    height: to-rpx(207);
    padding-left: to-rpx(43);
  }
}
</style>
