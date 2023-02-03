<template>
  <button :class="buttonClass" :style="buttonStyle" :plain="props.plain">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { capsuleButtonProps } from './interface'

import '../style/capsule-button.scss'

const props = defineProps(capsuleButtonProps())

const buttonClass = computed(() => [
  'capsule-button',
  { 'capsule-button__plain': props.plain }
])
const buttonStyle = computed(() => ({
  color: props.color
    ? props.color
    : props.plain
    ? 'var(--color-snow)'
    : 'var(--color-onyx)',
  backgroundColor: props.backgroundColor
    ? props.backgroundColor
    : props.plain
    ? 'transparent'
    : 'var(--color-snow)'
}))
</script>
