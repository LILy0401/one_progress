import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[]
  },
  mutations: {
    getclassList(state,data){
       return state.data = data;
    }
  },
  actions: {
    getclassList(state,{that}){
      that.$http.get('/getClassList').then(res=>{
          console.log(res.message);
          if(res.code == 1){
            state.commit('getclassList',res.message)
              // this.data = res.message
          }
      })
    }
  }
})
