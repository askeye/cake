import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store=new Vuex.Store({
  state: {
    code:'',
    path:'',
    lists:[],
  },
  getters: {

  },
  mutations: {
    change(state,payload){
      this.state.lists = payload;
    }
  },
  actions: {

  },
  modules: {

  }
})
export default store