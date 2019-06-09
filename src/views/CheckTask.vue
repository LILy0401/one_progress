<template>
    <div class="box">
        <div class="box_header">
            <p class="header_p">待检查任务列表</p>
            <p class="header_t_p">
                <span :class="status==item.task_status?'span_col':''" v-for="(item,index) in list" :key="index" @click="check_span(item.task_status)">{{item.title}}</span>
            </p>
        </div>
        <div class="box_section">
            <div class="box_con">
                <div class="box_con_li" v-for="(item,index) in taskList" :key="index">
                    <p>任务名称 --- {{item.task_name}}</p>
                    <p class="box_con_time">
                        <span>确认时间:</span>
                        <span>{{item.task_checked==1?'已确定':'未确定'}}</span>
                    </p>
                    <button @click="check_btn(item.tid,item.task_checked)" :class="item.task_checked==1?'cancle':'confirm'">{{item.task_checked==1?'取消':'确定'}}</button>
                </div>
            </div>
        </div>
        <Dialog v-show="flag">
            <span>{{title}}</span>
            <p class="check_person">检查人---{{name}}</p>
            <div class="btn">
            <p @click="createPro">确定</p>
            <p @click="createCancle">取消</p>
            </div>
    
        </Dialog>
    </div> 
</template>

<script>
import Dialog from '../components/dialog';
export default {
    data(){
        return{
            status:0,
            task_checked:0,
            flag:false,
            tid:'',
            name:'',
            title:'确认该任务已完成？',
            taskList:[],
            list:[
                {
                    title:'待确认',
                    task_status:0
                },
                {
                    title:'已确认',
                    task_status:1
                },{
                    title:'列表',
                    task_status:2
                }
            ]
        }
    },
    components:{
        Dialog
    },
    created(){
        this.check_span();
        this.name = window.localStorage.getItem('name');
    },
    methods:{
        check_span(status){
            this.status = status;
            let team_id = this.$route.query.team_id;
            this.$http.post('/checkStatus',{
                team_id:team_id,
                task_checked:this.status 
            }).then(res=>{
                if(res.code == 1){
                    this.taskList = res.message;
                }
            }) 
        },
        check_sta(tid){
            this.$http.get('/taskCheck?tid='+tid+'&checkPerson='+this.$route.query.member_id ).then((res)=>{
                if(res.code == 1){
                    this.$dialog({title:'修改成功'});
                }
            })
        },
        check_btn(tid,task_checked){
            this.flag = !this.flag;
            this.task_checked = task_checked;
            this.tid = tid;
            if(this.task_checked == 1){
                this.title = '取消设置该任务d完成状态？' 
            }else{
                this.title = '确认该任务已完成？';
            }
        },
        createPro(){
            this.flag = false;
            if(this.task_checked == 1){
                 this.$dialog({title:'目前不能取消'})
            }else{
               
                 this.check_sta(this.tid);
            }
        },
        createCancle(){
            this.flag = false;
        }
    }
    
}
</script>

<style lang='scss' scoped>
.box{
    width: 100%;
    height: 100%;
    display: flex;
    background: #eee;
    flex-direction: column;
}
.box_header{
    width: 100%;
    height: 100px;
    background: #5677fc;
    &>.header_p{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: .2rem;
       
    }
}
.header_t_p{
    display: flex;
    align-items: center;
    box-shadow: 0 0 6 7 #999;
    &>span{
        width: 30%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: .17rem;
    }
    &>.span_col{
        color:#ccc;
        border-bottom: 2px solid #ffff8c;
    }
}
.box_section{
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: auto;
}
.box_con{
    width: 100%;
    height: auto;
}
.box_con_li{
    width: 96%;
    height: 100px;
    background: #fff;
    padding: 0 15px;
    position: relative;
    border-bottom: 1px solid #ccc;
    &>p:nth-child(1){
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: .19rem;
        font-weight: bold;
    }
    .confirm{
        position: absolute;
        background: #5677fc;
        color: #fff;
        width: 60px;
        height: 27px;
        border: none;
        border-radius: 5px;
        right: 20px;
        top: 47px;
    }
    .cancle{
        position: absolute;
        background: #ccc;
        color: #666;
        width: 60px;
        height: 27px;
        border: none;
        border-radius: 5px;
        right: 20px;
        top: 47px;
    }
}
.box_con_time{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: .17rem;
    color: #666;
    
    &>span{
        padding: 0 10px;
    }
   
}
.check_person{
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
    font-size: .2rem;
}
</style>
