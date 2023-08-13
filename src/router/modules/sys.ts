export default {
  path: '/sys',
  redirect: '/sys/logs',
  meta: {
    icon: 'network',
    title: '系统',
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: '/sys/logs',
      name: 'sysLog',
      component: () => import('@/views/sys/logs.vue'),
      meta: {
        title: '操作日志'
      }
    },
    {
      path: '/sys/online',
      name: 'online',
      component: () => import('@/views/sys/online.vue'),
      meta: {
        title: '在线用户'
      }
    }
  ]
} as RouteConfigsTable
