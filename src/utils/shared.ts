const _toString = Object.prototype.toString

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isEmptyString(value: unknown) {
  return Object.is(value, '')
}

export function excludeKeys<
  O extends anyObj,
  K extends keyof O,
  R extends { [I in Exclude<keyof O, K>]: O[I] }
>(obj: O, keys: K[]): R {
  const result = {} as R

  for (const [k, v] of Object.entries(obj)) {
    if (keys.includes(k as K)) continue

    Reflect.set(result, k, v)
  }

  return result
}

export function toRawType(value: unknown): string {
  return _toString.call(value).slice(8, -1)
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is anyObj {
  return toRawType(value).toLowerCase() === 'object'
}

// @ts-ignore
export function deepCopy<T>(obj: T, map = new WeakMap<T, any>()): T {
  if (!isObject(obj) && !isArray(obj)) return obj
  if (map.has(obj)) return map.get(obj)

  const clone = isArray(obj) ? ([] as any[]) : ({} as Record<any, any>)
  const keys = Object.keys(obj)

  map.set(obj, clone)

  for (const key of keys) {
    // @ts-ignore
    clone[key] = deepCopy(Reflect.get(obj, key), map)
  }

  return clone as T
}
