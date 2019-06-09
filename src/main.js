import Vue from 'vue';
import App from './App.vue';
import router from './router'; //路由
import store from './store'; //仓库 
import ElementUI from 'element-ui'; //UI框架
import cookies from 'js-cookie';
import http from '../untils/http';

import dialog from '../untils/dialog.js';



import 'element-ui/lib/theme-chalk/index.css'; //UI样式
Vue.use(ElementUI) //使用UI框架

Vue.use(http)
import HeadTit from "./components/headerTit.vue"; //注册全局组件
Vue.component('HeadTit', HeadTit)
Vue.use(dialog)


Vue.directive('validator',{
    bind:function(el,binding){
        //失去焦点的时候
        let reg = binding.value.con;
        let hint = binding.value.hint;
        let p = document.createElement('p');
        el.addEventListener('blur',()=>{
            if(el.value == ''){
                el.classList.add('inp_err');
                el.placeholder='内容不能为空';
                if(el.parentNode.children.length!== 1){
        
                    el.parentNode.removeChild(p);
                    p.style = '';
                    p.innerHTML = '';
                } 
            }else{
                el.classList.remove('inp_err');
                el.title='';
                let val = reg.test(el.value);
                
                if(val){
                    if(el.parentNode.children.length!== 1){
        
                        el.parentNode.removeChild(p);
                        p.style = '';
                        p.innerHTML = '';
                    } 
                }else{
                
                    p.style.height='30px';
                    p.style.paddingLeft='8px';
                    p.style.background='#fff';
                    p.style.border='1px solid #f00';
                    p.style.fontSize='.18rem';
                    p.style.textAlign='center';
                    p.style.borderRadius='10px 10px 10px 0px';
                    p.style.lineHeight='30px';
                    p.style.color='red';
                    p.style.position='absolute';
                    p.style.top=`-${el.offsetHeight+'px'}`;
                    p.style.left='47px';
                    p.style.zIndex=99;
                    p.innerHTML = hint;
                    el.parentNode.appendChild(p)
                }
            
                
                
            }
        })
       
    },
    inserted:function(){
        
        // console.log('inserted',el)
    },
    update:function(){
      
    },
    componentUpdated: function(){
        // console.log('componentUpdated',)
    },
    unbind:function(){
        // console.log('unbind',)
    }
})

router.beforeEach((to,from,next)=>{
    // console.log(cookies.get('token'),'路由');
    if(to.path == '/' || to.path == '/register'){
        next();
    }else{
     
      let isLogin = !!cookies.get('token');
      if(!isLogin){
          next('/')
      }else{
          next()
      }
    }
})

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')