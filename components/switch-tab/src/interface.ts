import { PropType } from 'vue'

export const switchTabProps = () => ({
  tabs: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  index: {
    type: Number as PropType<number>,
    default: 0
  },
  activeBackgroundColor: {
    type: String as PropType<String>,
    default: 'var(--color-snow)'
  },
  inactiveBackgroundColor: {
    type: String as PropType<String>,
    default: '#E4E7E8'
  },
  textActiveColor: {
    type: String as PropType<String>,
    default: '#B1B1B1'
  },
  textInactiveColor: {
    type: String as PropType<String>,
    default: '#334856'
  }
})
