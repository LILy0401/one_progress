import Vue from 'vue';
import App from './App.vue';
import router from './router'; //路由
import store from './store'; //仓库 
import ElementUI from 'element-ui'; //UI框架
import 'element-ui/lib/theme-chalk/index.css'; //UI样式
Vue.use(ElementUI) //使用UI框架


import HeadTit from "./components/headerTit.vue"; //注册全局组件
Vue.component('HeadTit', HeadTit)

// header("Access-Control-Allow-Origin:*"); 
import axios from 'axios'; //使用axios
Vue.prototype.$ajax = axios; //挂载axios


Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')