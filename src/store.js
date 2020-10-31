import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store=new Vuex.Store({
  state: {
    code:'',
    path:'',
    lists:[],
    address:[],
  },
  getters: {
    count:state=>{
      var num = 0;
      for(var i=0;i<state.lists.length;i++){
        num +=state.lists[i].num
      }
      return num
    }
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