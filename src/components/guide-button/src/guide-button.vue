<template>
  <button class="guide-button" :style="buttonStyle">
    <view class="button-label guide-button__text">
      <slot></slot>
    </view>

    <text v-show="props.icon" :class="iconClass"></text>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { guideButtonProps } from './interface'

import '../style/guide-button.scss'

const props = defineProps(guideButtonProps())

const buttonStyle = computed(() => ({
  color: props.color,
  backgroundColor: props.backgroundColor
}))
const iconClass = computed(() => ['guide-button__icon', props.icon])
</script>
