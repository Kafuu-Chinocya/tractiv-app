import type { Component, Ref } from 'vue'

declare global {
  type MaybeRef<T> = Ref<T> | T
  type UnwrappedRef<T> = T extends Ref ? T['value'] : T
  type anyFn = (...args: any[]) => any
  type anyObj = Record<any, any>
  type anyArray = any[]
  type VCProps<C extends Component> = InstanceType<C>['$props']
  type ArrayType<T> = T extends (infer U)[] ? U : never
  type Writeable<T> = { -readonly [P in keyof T]: T[P] }
  type ValueOf<T> = T[keyof T]
}
