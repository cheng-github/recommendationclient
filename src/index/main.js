import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui';

Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
  data: {},
  router,
  store,
  watch:{
    "$route" : 'checkLogin'
  },
  created() {
    // 如果用户已经登录过，那么我们应该重定向到主页面,我们应该在服务器端做这个操作
    // 这里实现不方便也不合理
    this.checkLogin();
  },
  methods:{
    checkLogin(){
      // console.log("的")
    }
  },
  render: h => h(App),
}).$mount('#app')
