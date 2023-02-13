<template>
  <view class="you">
    <view
      id="chart"
      :prop="state"
      :change:prop="chart.propChangeHandler"
    ></view>

    <view @click="add">click</view>
  </view>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue'

export default {
  setup() {
    const state = ref({})

    const add = () => {
      state.value = {
        legend: {
          show: true,
          data: []
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          top: '15%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 4, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24
          ],
          axisLabel: {
            // inside: true,
            // color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#83bff6'
            }
          },
          z: 10
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#83bff6'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#83bff6'
            }
          }
        },
        series: [
          {
            data: [100, 110, 113, 126, 143, 158, 165, 167, 152, 102],
            type: 'bar',
            areaStyle: {
              show: true
            }
          }
        ],
        color: ['#83bff6']
      }
    }

    onMounted(() => {})

    return { state, add }
  }
}
</script>

<script lang="renderjs" module="chart">
import * as echarts from 'echarts'

import useEcharts from '@/mixins/useEcharts'

const echartsOptions = {
  chart: {}
}

export default {
  mixins: [useEcharts(echartsOptions)],
  data() {
    return {
      options: {},
      echarts
    }
  },
  methods: {
    propChangeHandler(newValue, oldValue, ownerInstance, instance) {
     this.options = newValue
     this.echartsInstances['chart']?.setOption(this.options)
    }
  },
  mounted() {
    this.echartsInstances['chart']?.setOption(this.options)
  }
}
</script>

<style lang="scss" scoped>
.you {
  width: 100vw;
  height: 100vh;
  background: red;
}

#chart {
  margin-top: 100px;
  width: 100%;
  height: 300px;
}
</style>
