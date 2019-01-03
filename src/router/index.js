import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Role from '@/pages/Role'
import Home from '@/pages/Home'

// 前端测试如果不从后台获得路由相关参数的值，可以直接在这里引入测试
// import SysLog from '@/pages/system/SysLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    }, 
    {
      path: '/role',
      name: 'Role',
      component: Role,
      hidden: true
    }, {
      path: '/home',
      name: '主页',
      component: Home,
      hidden: true,
      // meta: {
      //   requireAuth: false
      // }
    }
  ]
})
