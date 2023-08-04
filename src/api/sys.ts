import { http } from '@/utils/http'

export type SysLog = {
  id: number
  targetServer: string
  requestPath: string
  requestMethod: string
  url: string
  requestBody: string
  responseData: string
  ip: string
  requestTime: string
  responseTime: string
  executeTime: number
  address: string
  responseSize: number
}

export type SysLogRes = {
  totalElements: number
  content: SysLog[]
}


export const getSysLogs = (params: { page: number; size: number }) => {
  return http.request<SysLogRes>('get', '/api/sys/api/logs', {
    params
  })
}
