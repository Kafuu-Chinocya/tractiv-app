import type { PropType } from 'vue'

export const menuExpandProps = () => ({
  visible: {
    type: Boolean as PropType<boolean>
  },
  currentPageName: {
    type: String as PropType<string>
  }
})
