import { http } from '@/utils/http'
import Qs from 'qs'

export type SysLog = {
  id: number
  module: string
  username: string
  description: string
  method: string
  params: string
  logType: string
  requestIp: string
  address: string
  browser: string
  time: number
  exceptionDetail: string
  createTime: Date
}


export type OnlineUser = {
  id: number
  userName: string
  nickName: string
  browser: string
  ip: string
  address: string
  loginTime: Date
}

export type SysLogRes = {
  totalElements: number
  content: SysLog[]
}


export const getSysLogs = (params: { page: number; size: number }) => {
  return http.request<SysLogRes>('get', '/api/sys/api/logs', {
    params,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export const getOnlineUsers = (params: { page: number; size: number }) => {
  return http.request<OnlineUser[]>('get', '/api/uc/auth/online', {
    params,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

