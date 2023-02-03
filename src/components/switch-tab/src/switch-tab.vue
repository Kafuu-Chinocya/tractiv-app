<template>
  <view class="switch-tab">
    <view
      :class="[
        'switch-tab__item',
        { 'switch-tab__item--active': idx === props.index }
      ]"
      :style="itemStyle"
      v-for="(item, idx) of props.tabs"
      :key="`switch-tab__${idx}`"
      @click="itemClickHandler(idx)"
    >
      {{ item }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { switchTabProps } from './interface'

import '../style/switch-tab.scss'

const props = defineProps(switchTabProps())
const emit = defineEmits(['tabtap', 'update:index'])

const itemStyle = computed(() => ({
  '--switch-tab-active-background-color': props.activeBackgroundColor,
  '--switch-tab-inactive-background-color': props.inactiveBackgroundColor,
  '--switch-tab-active-text-color': props.textActiveColor,
  '--switch-tab-inactive-text-color': props.textInactiveColor
}))

function itemClickHandler(idx: number) {
  emit('tabtap', idx)
  emit('update:index', idx)
}
</script>
