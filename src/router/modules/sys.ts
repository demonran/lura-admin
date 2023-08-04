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
      name: 'logs',
      component: () => import('@/views/sys/logs.vue'),
      meta: {
        title: '操作日志'
      }
    }
  ]
} as RouteConfigsTable
