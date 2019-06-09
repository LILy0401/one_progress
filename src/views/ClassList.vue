<template>
    <div class="box">
        <div class="section">
            
            <div class="sec_content" v-for='(item) in getclassList' :key="item.cid">
                <p :class="cid == item.cid?'col_box':''" @click="check_p(item.cid,item.class_name)">
                    <span>{{item.class_name}}</span>
                    <span>{{item.class_info}}</span>
                </p>
            </div>
            <div class="btn_box">
                <button class="btn_sure" @click="confirm_btn">{{type=='student'?'确定':'新增班级'}}</button>
            </div>
        </div>
        <Dialog v-show="flag">
    
            <span>创建班级</span>
            <div class="input">
            <input type="text" placeholder="请输入班级名称" v-model="className">
            <textarea name="" id="" cols="30" rows="10" placeholder="添加班级介绍" v-model="classInfo"></textarea>
            </div>
            <div class="btn">
            <p @click="createPro">确定</p>
            <p @click="showDialog">取消</p>
            </div>
        </Dialog>
        <div class="footer">
            网站工程实训班级项目进度管理平台
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import  store from '../store' 
import Dialog from '../components/dialog';
import { constants } from 'crypto';
export default {
    data(){
        return{
            cid:null,
            data:[],
            class_name:'',
            type:'',
             flag: false,
             className:'',
             classInfo:''
        }
    },
    computed:{
        getclassList(){
            return store.state.data
        }
    },
    components:{
        Dialog
    },
    created(){
        this.$store.dispatch('getclassList',{that:this});
        this.type = localStorage.getItem('type');
    },
    methods:{
       
        check_p(cid,name){
            this.cid = cid; 
            this.class_name = name;
            if(this.type === 'teacher'){
                setTimeout(()=>{
                    this.$router.push({
                        path:'/projectEntry',
                        query:{
                            cid:cid
                        }
                    })
                },1000);
            }
        },
        confirm_btn(){
            if(this.type == 'student'){
                    let sid = localStorage.getItem('sid');
                    if(this.cid){

                        this.$http.post('/checkClass',{
                            cid:this.cid,
                            sid:sid
                        }).then(res=>{
                            console.log(res);
                            if(res.code == 1){
                                setTimeout(()=>{
                                    this.$router.push({
                                        path:'/projectEntry',
                                        query:{
                                            cid:this.cid,
                                            class_name:this.class_name
                                        }
                                    })
                                },1000)
                            }else{
                                this.$dialog({title:'失败'})
                            }
                        })
                    }else{
                        this.$dialog({title:'请选择班级'})
                      
                    }
            }else{
                this.flag = !this.flag;
            }
          
        },
        createPro(){
            this.flag = !this.flag;
            if(this.classInfo&&this.className){
                 this.$http.post('/addClass',{
                    class_info:this.classInfo,
                    class_name:this.className
                }).then(res=>{
            
                    if(res.code == 1){
                        this.$dialog({title:'添加班级成功'})
                        this.$store.dispatch('getclassList',{that:this});
                    }else{
                        this.$dialog({title:'添加班级失败'})
                    }
                })
            }else{
                this.$dialog({title:'请输入班级信息'})
            }
           
        },
        showDialog(val) {
            this.flag = !val;
        },
    }
}
</script>
<style scoped lang='scss'>
.box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.section{
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: auto;
    align-items: center;
}
.sec_content{
    width: 50%;
    height: 150px;
    display: inline-block;
    .col_box{
        border: 1px solid red;
    }
    &>p{
        width: 60%;
        margin: auto;
        margin-top: 10px;
        height: 110px;
        background: #eee;
        text-align: center;
        line-height: 50px;
        border: 1px solid #ccc;
        &>span{
            display: block;
        }
        &>span:nth-child(1){
            font-weight: bold;
            font-size: .22rem;
        }
         &>span:nth-child(2){
            font-size: .15rem;
        }
    }
}
.btn_box{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.btn_sure{
    width: 20%;
    height: 35px;
    background: #fff;
    border-radius: 8px;
    font-size: .20px;
    border: 1px solid #ccc;
}
.footer{
    width: 100%;
    height: 50px;
    background: blueviolet;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: .17rem;
}

</style>
