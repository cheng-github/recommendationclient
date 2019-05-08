import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);


// 使用render去替换使用template或el指定的元素作为挂载元素
// 这样做的目的是为了发挥灵活性
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
