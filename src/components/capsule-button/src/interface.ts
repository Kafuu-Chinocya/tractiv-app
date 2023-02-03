import { PropType } from 'vue'

export const capsuleButtonProps = () => ({
  plain: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  backgroundColor: {
    type: String as PropType<string>
  },
  color: {
    type: String as PropType<string>
  }
})
