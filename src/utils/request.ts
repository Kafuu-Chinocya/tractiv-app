import userUser from '@/stores/user'

interface Options {
  // 取消重复请求
  cancelDuplicateRequest?: boolean
  // 启用 loading
  loading?: boolean
  // 只返回 data 数据
  reductDataFormat?: boolean
  // 展示错误信息
  showErrorMessage?: boolean
  // 展示成功信息
  showSuccessMessage?: boolean
  // 展示特殊状态码信息
  showCodeMessage?: boolean
}

const pendingMap = new Map<string, AbortController>()
const defaultOptions: Options = {
  cancelDuplicateRequest: true,
  loading: true,
  reductDataFormat: true,
  showErrorMessage: true,
  showCodeMessage: false,
  showSuccessMessage: false
}
let loadingTimer: number
let _auth: ReturnType<typeof userUser>

function ensureAuth() {
  return _auth || (_auth = userUser())
}

function getPendingKey(config: anyObj) {
  const { url, method, params, data } = config

  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function createRequest(
  config: anyObj,
  options: Options = {},
  loadingOptions: anyObj = {}
) {}
