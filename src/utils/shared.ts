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
