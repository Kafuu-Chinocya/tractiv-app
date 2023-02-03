import { computed, getCurrentInstance } from 'vue'

import useProp from '@/hooks/useProp'

export default <T = any>(modelName: string, emitName = modelName) => {
  const vm = getCurrentInstance()!
  const prop = useProp<T>(modelName)
  const _val = computed({
    get: () => prop.value,
    set: (val) => {
      vm.emit(`update:${emitName}`, val)
    }
  })

  return _val
}
