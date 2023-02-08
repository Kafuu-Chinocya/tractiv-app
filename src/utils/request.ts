import { URL } from '@/constants'
import userUser from '@/stores/user'
import { excludeKeys } from '@/utils/shared'

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
  target: { show: anyFn; close: anyFn } | null
  count: number
}

interface RequestParams extends UniNamespace.RequestOptions {
  cancelToken?: string
}

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
const defaultLoadingOptions = {
  title: 'Loading ...',
  mask: true
}
const loadingTarget = {
  show(options: UniApp.ShowLoadingOptions) {
    uni.showLoading(options)
  },
  close() {
    uni.hideLoading()
  }
} as const

let loadingTimer: number
let _auth: ReturnType<typeof userUser>

function ensureAuth() {
  return _auth || (_auth = userUser())
}

function getPendingKey(config: RequestParams) {
  const { url, method, data } = config

  return [url, method, JSON.stringify(data)].join('&')
}

const addPending: (config: RequestParams, requestTask: requestTask) => void = (
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

const removePending: (config: RequestParams) => void = (config) => {
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

function httpErrorStatusHandle(error: any) {}

const defaultHandler = () => undefined

export function createRequest(
  config: RequestParams,
  options: Options = {},
  loadingOptions: UniApp.ShowLoadingOptions = {}
) {
  const token = ensureAuth().userInfo?.token
  const mergedOptions = Object.assign({}, defaultOptions, options)
  const normalConfig = excludeKeys(config, ['success', 'fail', 'complete'])
  let {
    success = defaultHandler,
    fail = defaultHandler,
    complete = defaultHandler
  } = config

  removePending(config)

  // 创建 loading
  if (mergedOptions.loading) {
    loadingInstance.count++

    if (loadingInstance.count === 1) {
      if (loadingInstance.target !== null) {
        clearTimeout(loadingTimer)
      } else {
        loadingInstance.target = loadingTarget
        loadingInstance.target.show(
          Object.assign({}, defaultLoadingOptions, loadingOptions)
        )
      }
    }
  }

  // 附带 token
  if (token) {
    if (!normalConfig.header) {
      normalConfig.header = {}
    }

    normalConfig.header.Authorization = token
  }

  const requestTask = uni.request({
    ...normalConfig,
    success(v) {
      success(v)
    },
    fail(error) {
      mergedOptions.showErrorMessage && httpErrorStatusHandle(error)
      fail(error)
    },
    complete(v) {
      removePending(config)
      mergedOptions.loading && closeLoading(mergedOptions)
      complete(v)
    }
  })

  mergedOptions.cancelDuplicateRequest && addPending(config, requestTask)

  return requestTask
}
