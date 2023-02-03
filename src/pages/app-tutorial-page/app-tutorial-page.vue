<template>
  <view class="app-tutorial-page">
    <swiper
      class="app-tutorial-page__swiper"
      circular
      indicator-dots
      indicator-active-color="var(--color-snow)"
      :current="current"
    >
      <swiper-item v-for="(item, idx) of itemList" :key="idx">
        <view
          class="app-tutorial-page__item"
          :style="{ backgroundColor: item.backgroundColor }"
        >
          A
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const current = ref(0)
const itemList = reactive([
  {
    backgroundColor: 'var(--color-sand)'
  },
  {
    backgroundColor: 'var(--color-rust)'
  },
  {
    backgroundColor: 'var(--color-sage)'
  }
])
</script>

<style lang="scss" scoped>
.app-tutorial-page {
  height: 100vh;

  &__swiper {
    height: 100%;
  }

  &__item {
    padding-top: var(--status-bar-height);
    height: 100%;
  }
}
</style>
