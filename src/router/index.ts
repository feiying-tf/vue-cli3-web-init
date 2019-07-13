import Vue from 'vue'
import Router from 'vue-router'
import { routerMap } from '@/router/router.config'

Vue.use(Router)

export default new Router({
  // base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
