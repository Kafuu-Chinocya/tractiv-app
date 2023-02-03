export {}
declare global {
  interface ApiResponse<T = any> {
    code: string
    data: T
    msg: string
    success: boolean
  }

  interface UserInfo {
    token: string
    id: string
    username: string
  }

  type ApiPromise<T = any> = Promise<ApiResponse<T>>
}
