<template>
  <view class="message-card">
    <view class="message-card__content">
      <view class="message-card__content--header">
        <image class="message-card__avatar" :src="props.data.avatar" />
        <view class="message-card__title">
          <text>{{ props.data.name }}</text>
          <text class="message-card__date">{{ props.data.time }}</text>
        </view>
        <text class="message-card__dot iconfont icon-gengduo"></text>
      </view>

      <view class="message-card__content--center">
        {{ props.data.message }}
      </view>
    </view>
    <view class="message-card__actions">
      <view
        class="message-card__actions-item"
        v-for="icon of actionIcons"
        :key="icon.name"
      >
        <text :class="icon.class" class="message-card__action-icon"></text>
        <text class="message-card__action-text">{{ icon.name }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<{
      name: string
      avatar: string
      time: string
      message: string
    }>
  }
})

const actionIcons = [
  {
    class: 'iconfont icon-icn_like_active',
    name: 'LIKE'
  },
  {
    class: 'iconfont icon-icn_comment_active',
    name: 'COMMENT'
  },
  {
    class: 'iconfont icon-icn_share_active',
    name: 'SHARE'
  }
]
</script>

<style lang="scss" scoped>
.message-card {
  border-radius: to-rpx(10);
  padding: to-rpx(18) 0;
  background-color: var(--color-snow);
  box-shadow: 0 5px 10px rgba(80, 92, 98, 0.1);

  &__content {
    padding: 0 to-rpx(14);

    &--header {
      display: flex;
      margin-bottom: 15px;
    }

    &--center {
      padding-bottom: 16px;
    }
  }

  &__avatar {
    width: to-rpx(70);
    height: to-rpx(70);
    margin-right: to-rpx(12);
    border-radius: 50%;
    background-color: var(--color-ice);
  }

  &__title {
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    font-size: to-rpx(15);
    line-height: 1.5;
    font-weight: 700;
    color: #334856;
  }

  &__date {
    color: #798186;
    font-weight: 300;
  }

  &__dot {
    font-size: to-rpx(18);
    font-weight: 700;
    color: #798186;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: to-rpx(18);
    border-top: 1px solid var(--color-ice);

    &-item {
      display: inline-flex;
      align-items: center;
    }
  }

  &__action-icon {
    margin-right: 4px;
    font-size: to-rpx(16);
    color: var(--color-fossil);
  }

  &__action-text {
    font-size: to-rpx(14);
    font-weight: 400;
    color: #334856;
  }
}
</style>
