import { createRequest } from '@/utils/request'
import url from './url'

type requestParams = Partial<Parameters<typeof createRequest>[0]>

export function getRandomUserInfo(params: requestParams) {
  return createRequest({
    ...params,
    url: url.getRandomUserInfo
  })
}
