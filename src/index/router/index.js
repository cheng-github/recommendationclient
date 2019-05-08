import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../components/Login.vue'
import UserInfo from '../components/UserInfo.vue'

Vue.use(VueRouter)

//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
export default new VueRouter({
    routes: [{
      path: '/login',
      component: Login
    }, {
      path: '/user_info',
      component: UserInfo
    }]
  })

