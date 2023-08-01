export default {
  path: '/uc',
  redirect: '/uc/user',
  meta: {
    icon: 'network',
    title: '系统管理',
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: '/gateway/user-management',
      name: 'user-management',
      component: () => import('@/views/uc/user-management.vue'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: '/gateway/role-management',
      name: 'role-management',
      component: () => import('@/views/uc/role-management.vue'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: '/gateway/menu-management',
      name: 'menu-management',
      component: () => import('@/views/uc/menu-management.vue'),
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: '/gateway/dept-management',
      name: 'dept-management',
      component: () => import('@/views/uc/dept-management.vue'),
      meta: {
        title: '部门管理'
      }
    }
  ]
} as RouteConfigsTable
