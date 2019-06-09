import Vue from 'vue';
import dialogs from '../src/components/Dialogs.vue';
//extend 是component 的底层实现
//component 是extend 的语法糖

// Vue.component('dialogs',dialog);//Vue.component全局组件<dialogs></dialogs>
let DialogConstructor=Vue.extend(dialogs); 
// console.log(DialogConstructor);//是个函数


// console.log(cdialog); //对象,他只是一个单纯的对象，还没有和页面有关联，得挂载到元素上

export default function(Vue){
    Object.defineProperty(Vue.prototype,'$dialog',{
        value(options){
        
            let cdialog=new DialogConstructor({
                el:document.createElement('div'),
                data(){
                    return{
                        title:options.title,
                        isShow:false
                    }
                }
            });
            
            //把组件挂载到元素上
            // let el = document.createElement('div');
            // cdialog.$mount(el);

            document.body.appendChild(cdialog.$el);
            cdialog.isShow  = true;
            setTimeout(()=>{
                document.body.removeChild(cdialog.$el);
            },1700)
        }
    })
}