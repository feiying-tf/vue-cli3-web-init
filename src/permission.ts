import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
const USER = '__user__'
import storage from 'good-storage'

// 路由白名单(不用权限)
const authList = ['/center']

// 全局守卫
router.beforeEach((to, from, next) => {
  // next()
  if (getToken()) { // 如果有token
    // 如果此时vuex里面没有用户信息的时候，那么读取storage里面的信息保存到vuex里面
    if (!store.getters.user) {
      store.commit('SET_USER', storage.get(USER));
    }
    if (to.path === '/login') {
      next('/') 
    } else {
      next()      
    }
  } else {
    // 这儿是处理多个页面时，新页面已经退出了，旧页面vuex里面还保存有数据的情况
    if (store.getters.user) {
      location.reload();
    }
    if (authList.indexOf(to.path) === -1) { // 不在黑名单里面，直接跳出
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

// 全局后置，结束进度条
router.afterEach(() => {
  // 如果vuex里面的userid 与 storage里面的userid不同，说明有新的用户登录，刷新当前页面，将数据
  // 刷新为最新用户的数据
  if ( storage.get(USER) && store.getters.user && (store.getters.user.id !== storage.get(USER).id)) {
    location.reload();
    return
  }
})
