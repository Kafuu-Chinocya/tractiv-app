import { PropType } from 'vue'

export const guideButtonProps = () => ({
  backgroundColor: {
    type: String as PropType<string>
  },
  color: {
    type: String as PropType<string>
  },
  icon: {
    type: String as PropType<string>
  }
})
