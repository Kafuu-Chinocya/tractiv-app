import { URL } from '@/constants'
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

interface LoadingInstance {
  target: (anyObj & { close: anyFn }) | null
  count: number
}

type requestParams = UniNamespace.RequestOptions & { cancelToken?: string }
type requestTask = UniNamespace.RequestTask

const pendingMap = new Map<string, requestTask>()
const loadingInstance: LoadingInstance = {
  target: null,
  count: 0
}
const defaultOptions: Options = {
  cancelDuplicateRequest: true,
  loading: true,
  reductDataFormat: true,
  showErrorMessage: true,
  showCodeMessage: false,
  showSuccessMessage: false
}
let loadingTimer: number
const _auth = userUser()

function getPendingKey(config: anyObj) {
  const { url, method, params, data } = config

  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

const addPending: (config: requestParams, requestTask: requestTask) => void = (
  config,
  requestTask
) => {
  const key = getPendingKey(config)

  if (config.cancelToken) {
    pendingMap.set(key, requestTask)
  } else if (!config.cancelToken && !pendingMap.has(key)) {
    config.cancelToken = key
    pendingMap.set(key, requestTask)
  }
}

const removePending: (config: requestParams) => void = (config) => {
  const key = getPendingKey(config)
  const task = pendingMap.get(key)

  if (task) {
    task.abort()
    pendingMap.delete(key)
  }
}

function closeLoading(options: Options) {
  if (options.loading && loadingInstance.count > 0) loadingInstance.count--

  clearTimeout(loadingTimer)
  loadingTimer = setTimeout(() => {
    if (loadingInstance.count === 0) {
      loadingInstance.target?.close()
      loadingInstance.target = null
    }
  }, 300)
}

function createRequest(
  config: requestParams,
  options: Options = {},
  loadingOptions: anyObj = {}
) {
  const token = _auth.userInfo?.token
  const mergedOptions = Object.assign({}, defaultOptions, options)

  removePending(config)

  const requestTask = uni.request(config)
  options.cancelDuplicateRequest && addPending(config, requestTask)
}
