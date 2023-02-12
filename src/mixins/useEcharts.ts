// @ts-nocheck
import { init, type EChartsOption } from 'echarts'

export default (echartsOptions: { [id: string]: EChartsOption }) => {
  return {
    data() {
      return {
        echartsInstances: {},
        sads: { a: 1, b: 2 }
      }
    },
    methods: {
      // 初始化所有图表
      initEcharts() {
        Object.entries(echartsOptions).forEach(([id, option]) => {
          const element: HTMLElement | null = document.querySelector(`#${id}`)

          if (!element) return

          const instance = init(element)
          instance.setOption(option)
          window.addEventListener('resize', instance.resize as anyFn)
          this.echartsInstances[id] = instance
          // this.$nextTick(() => instance.resize())
        })
      },
      // 卸载所有图表
      uninstallEcharts() {
        Object.keys(echartsOptions).forEach((id) => {
          window.removeEventListener('resize', this.echartsInstances[id].resize)
          this.echartsInstances[id].dispose()
        })
      }
    },
    mounted() {
      this.initEcharts()
    },
    beforeDestroy() {
      this.uninstallEcharts()
    }
  }
}
