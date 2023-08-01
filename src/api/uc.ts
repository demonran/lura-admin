import { http } from '@/utils/http'

export type Job = {
  id: number
  name: string
}

export type Menu = {
  cache: boolean
  component: string
  componentName: string
  createTime: string
  hasChildren: boolean
  hidden: boolean
  iFrame: boolean
  icon: string
  id: number
  label: string
  leaf: boolean
  menuSort: number
  path: string
  pid: number
  subCount: number
  title: string
  type: number
}

export type Dept = {
  createBy: string
  createTime: string
  deptSort: number
  enabled: boolean
  hasChildren: boolean
  id: number
  label: string
  leaf: boolean
  name: string
  pid: number
  subCount: number
  updateBy: string
  updateTime: string
}

export type Role = {
  dataScope: string
  id: number
  level: number
  name: string
  createTime?: string
  depts?: Dept[]
  description?: string
  menus?: Menu[]
  updateBy?: string
  updateTime?: string
}

export type User = {
  avatarPath: string
  createBy: string
  createTime: string
  dept: {
    id: number
    name: string
  }
  email: string
  enabled: boolean
  gender: string
  id: number
  jobs: Job[]
  nickName: string
  phone: string
  roles: Role[]
  updateBy: string
  updateTime: string
  username: string
}

export type UsersRes = {
  content: User[]
  totalElements: number
}

export type RolesRes = {
  content: Role[]
  totalElements: Role[]
}
export type MenusRes = {
  content: Menu[]
  totalElements: number
}

export type DeptsRes = {
  content: Dept[]
  totalElements: Role[]
}

// 用户

export const getUsers = (params: { page: number; size: number }) => {
  return http.request<UsersRes>('get', '/api/uc/api/users', {
    params
  })
}
export const editUsers = data => {
  return http.request('put', '/api/uc/api/users', {
    data
  })
}
export const delUsers = data => {
  return http.request('delete', '/api/uc/api/users', {
    data
  })
}
export const addUsers = data => {
  return http.request('post', '/api/uc/api/users', {
    data
  })
}

// 角色
export const getRoles = (params: { page: number; size: number }) => {
  return http.request<RolesRes>('get', '/api/uc/api/roles', {
    params
  })
}
export const editRoles = data => {
  return http.request('put', '/api/uc/api/roles', {
    data
  })
}
export const delRoles = data => {
  return http.request('delete', '/api/uc/api/roles', {
    data
  })
}
export const addRoles = data => {
  return http.request('post', '/api/uc/api/roles', {
    data
  })
}

// 菜单
export const getMenus = (params: { page: number; size: number }) => {
  return http.request<MenusRes>('get', '/api/uc/api/menus', {
    params
  })
}
export const editMenus = data => {
  return http.request('put', '/api/uc/api/menus', {
    data
  })
}
export const delMenus = data => {
  return http.request('delete', '/api/uc/api/menus', {
    data
  })
}
export const addMenus = data => {
  return http.request('post', '/api/uc/api/menus', {
    data
  })
}
