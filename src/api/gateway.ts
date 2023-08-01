import { http } from '@/utils/http'

export type GatewayLog = {
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

export type GateWayLogRes = {
  totalElements: number
  content: GatewayLog[]
}

export type GatewayRoute = {
  /** ID */
  id?: string
  name: string
  // predicates: Array<GatewayPredicate>;
  // filters: Array<GatewayFilter>;
  uri: string
  path: string
  authType: string
  swaggerUrl: string
  // metadata: {
  //   additionalProp1: {};
  //   additionalProp2: {};
  //   additionalProp3: {};
  // };
  // order: number;
}

export const getGateWayLogs = (params: { page: number; size: number }) => {
  return http.request<GateWayLogRes>('get', '/api/gateway/logs', {
    params
  })
}
export const getGateWayRoutes = () => {
  return http.request<GatewayRoute[]>('get', '/api/gateway/routes')
}
export const addGateWayRoute = (data: GatewayRoute) => {
  return http.request('post', '/api/gateway/routes', {
    data
  })
}
export const editGateWayRoute = (data: GatewayRoute) => {
  return http.request('put', '/api/gateway/routes', {
    data
  })
}
export const delGateWayRoute = (name: string) => {
  return http.request('delete', `/api/gateway/routes/${name}`)
}
