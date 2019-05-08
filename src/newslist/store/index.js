import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      // navChangeIncre: 1,
      category: "",
      requestType: "homepage"
    },
    mutations: {
      // resetPage(state) {
      //   state.navChangeIncre++ 
      // },
      changeRequestType(state, newType) {
        state.requestType = newType
      },
      changeCategory(state, newCategory) {
        state.category = newCategory
      }
    },
    actions: {
      changeNavCondition(context, condition) {
        context.commit('changeCategory', condition.category)
        context.commit('changeRequestType', condition.requestType)
      }
    },
    // 没有必要使用getters，不属于计算属性
    getters:{
      
    }
  });