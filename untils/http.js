import axios from 'axios';
import { Message } from 'element-ui';

import cookies from 'js-cookie'; 
// 自定义配置一个axios的实例
let instance = axios.create({
    // baseURL:'',基本路径
    timeout:5000
})

//请求拦截
instance.interceptors.request.use((config)=>{
    let token= cookies.get('token');
    // console.log(token,'请求拦截');
    config.headers.authorization = token;
    return config;
})

//响应拦截
instance.interceptors.response.use(res=>{
    if(res.status == 200 && res.data.code == 1){
        return res.data
    }else{
        Message({
            showClose: true,
            message: res.data.msg,
            type: "error"
        })
        return res.data
    }
})

export default{
    install(Vue,options){
        Object.defineProperty(Vue.prototype,'$http',{
            value:instance
        })
    }
}