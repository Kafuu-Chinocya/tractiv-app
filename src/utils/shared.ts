export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isEmptyString(value: unknown) {
  return Object.is(value, '')
}
