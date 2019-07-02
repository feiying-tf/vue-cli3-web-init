// eslint-disable-next-line
// import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

import Home from '@/views/Home.vue'

export const routerMap = [
  {
    path: '/',
    name: 'index',
    component: Home,
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
  },
  // 关于我们
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: () => import('@/views/aboutUs/index.vue'),
  },
  // 个人中心
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/center/index.vue'),        
  },
  // 新闻详情
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: () => import('@/views/newsDetail/index.vue'),
    children: [
      {
        path: ':id',
        component: () => import('@/views/newsDetail/component/detail.vue'),
      }
    ]
  },
  {
    path: '*', redirect: '/wrong', hidden: true
  },
  {
    path: '/wrong', 
    name: '404',
    component: () => import('@/views/wrong/index.vue'),
  },
]
