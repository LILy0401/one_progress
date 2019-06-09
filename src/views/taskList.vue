<template>
  <div class="GroupList">
    <div class="header">
        任务列表
        <span class="span_col" v-show="isShow" @click="goTaskList"></span>
    </div>
    <section>
      <Process :step="step"></Process>
      <ul class="navList">
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="index===ind?'active':''"
          @click="changeNav(index)"
        >{{item}}</li>
      </ul>
      <ul class="uls">
        <li class="lis" v-for="(item) in taskList" :key="item.tid">
            <p class="tasks">
                 <span>{{item.task_name}}</span>
            </p>
            <p :style="{'display':type==2?'none':'block'}">
                <span @click="checks(1,item.tid,item.member_id)">{{item.task_status==0?'未开始':'开始'}}</span>|<span @click="checks(2,item.tid,item.member_id)">完成</span>|<span>创建时间</span>
                 |<span @click="delTask(item.tid)">删除</span>
            </p>
            <span class="alter" :style="{'display':type==2?'none':'block'}" @click="updates">修改</span>
           
            <p class="confirm" :style="{'display':type==2?'block':'none'}">
                <span>创建时间</span>|<span>{{item.task_checked?'已确认':'未确认'}}</span>
                |<span @click="delTask(item.tid)">删除</span>
            </p>
            <span class='confirm_alter'  :class="item.task_checked==1?'confirm_alter_col':'' " :style="{'display':type==2?'block':'none'}"></span>
        </li> 
    </ul>
      <Dialog v-show="flag">  
        
        <span>{{task}}任务</span>
        <div class="input">
          <input type="text" :placeholder="inpname" v-model="taskName">
        </div>
        <div class="btn" v-if="task==='添加'">
          <p @click="createTask">确定</p>
          <p @click="showDialog">取消</p>
        </div>
        <div class="btn" v-if="task==='修改'">
          <p @click="changeTask">修改</p>
          <p @click="showDialog">取消</p>
        </div>
      </Dialog>
      <createBtn :createBtn="createBtn" :flag="flag" @showDialog="showDialog"></createBtn>
    </section>
    <footer>
      
      <el-input v-model="search" placeholder="搜索"></el-input>
    </footer>
  </div>
</template>

<script>
import HeadTit from "../components/headerTit.vue";
import createBtn from "../components/createBtn.vue";
import Dialog from "../components/dialog.vue";
import Process from "../components/process.vue";
export default {
  name: "taskList",
  components: {
    HeadTit,
    createBtn,
    Dialog,
    Process
  },
  data() {
    return {
      isShow:false,
      createBtn: "添加",
      navList: ["todo", "doing", "done"],
      search: "",
      flag: false,
      ind: 0,
      tid:'',
      identity:0,
      type:'',
      task: "",
      taskName: "",
      taskList: [],
      taskData:[],
      member_id:'',
      inpname: "请输入任务描述",
      step: "0%",
      doingIndex:'',
      title:'',
    };
  },
  created() {
    this.member_id = this.$route.query.member_id;
    this.identity = this.$route.query.identity;
    this.getTask();
    this.judge();
  

  },
  methods: {
    checks(status,tid,mid){
      this.$http.get(`/taskStatus?tid=${tid}&status=${status*1}`).then(res=>{
        if(res.code == 1){
          this.getTask();
          this.$dialog({title:'修改成功'})
        }
       
      })
    },
    updates(title){
      this.isShow = true;
      this.title = title;
     
    },
    
     judge(){
        if(this.identity == 1){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
    },
    //只有组长才可以看到的按钮
    goTaskList(){
      this.$router.push({
        path:'/checkTask',
        query:{
          team_id:this.$route.query.team_id,
          member_id:this.$route.query.member_id
        }
      })
    },
    showDialog(val, task) {
      this.task = task;
      this.flag = !val;
      this.inpname = "请输入任务描述";
    },
    changeNav(ind) {
      this.ind = ind;
      this.type = ind;
      this.taskList = this.taskData.filter((ele)=>ele.task_status==ind)
    },
    createTask() {
      if (this.taskName) {
        this.$http.post("/createTask", {
          task_name: this.taskName,
          member_id: this.$route.query.member_id,
          team_id: this.$route.query.team_id,
          project_id: this.$route.query.project_id
        }).then(res=>{
          console.log(res);
        })
        this.flag = !this.flag;
        this.getTask();
      } else {
        alert("taskName不能为空");
        this.flag = !this.flag;
      }
    },
    getTask() {
    
      this.$http.get(`/tasksList?member_id=${this.member_id}`).then(res => {
      if (res.results.length) {
          this.taskData = res.results;
          this.taskList = this.taskData.filter((ele)=>ele.task_status === 0)
          this.step = "33.33%";
        }else{
            this.taskList = res.results;
          this.step = "0%";
        }
      });
    },
    delTask(tid) {
      this.tid = tid;
      this.$http.get(`/deleteTask?tid=${tid}&member_id=${this.member_id}`).then(res=>{
      
        if(res.code == 1){
          this.$dialog({title:'删除成功'});
          let index = this.taskData.findIndex(ele=>ele.tid ==tid);
          this.taskData.splice(index,1);
        }
      })
    },
    setTaskName(name,tid) {
      this.flag = true;
      this.tid = tid;
      this.task = "修改";
      this.inpname = name;
    },
    changeTask() {
      
      this.$http.post('/changeTask',{
          task_name:this.taskName,
          tid:this.tid
      }).then(res=>{
        
        if(res.code == 1){
          this.$dialog({title:'修改成功'});
          this.getTask();
        }else{
          this.$dialog({title:'修改失败'});
        }
      })
      this.flag = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.GroupList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f1f1;
  .header{
    width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: .26rem;
    font-weight: bold;
    text-align: center;
    position: relative;
    background: #fff;
    &>.span_col{
        position: absolute;
        top: 7px;
        right: 20px;
        display: inline-block;
        width: 45px;
        height: 35px;
        border-radius: 8px;
        background: #eee;
        border: 1px solid #ccc;
      }
  }
  section {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    .navList {
      width: 95%;
      height: 32px;
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
      li {
        flex: 1;
        height: .4rem;
        text-align: center;
        line-height: .4rem;
        font-size: .2rem;
        background: #fff;
        border-right: 2px solid #0076ff;
      }
      li:nth-child(3) {
        border-right: 0;
      }
      .active {
        background: #0076ff;
        color: #fff;
      }
    }
    .content {
      width: 95%;
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      > div {
        height: 90px;
        width: 94%;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        margin-bottom: 10px;
        .left {
          .leftTit {
            font-size: .18rem;
          }
          .leftList {
            font-size: .15rem;
            color: #ccc;
            margin-top: 15px;
            span {
              margin-left: 10px;
              padding-right: 10px;
              border-right: 2px solid #ccc;
            }
            span:nth-child(3) {
              border: 0;
            }
          }
        }
        .right {
          width: 44px;
          height: 22px;
          background: #eee;
          text-align: center;
          line-height: 22px;
          font-size: .16rem;
        }
        .doing{
          background: skyblue;
          color: #fff;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    .el-input {
      input {
        outline: none;
        border: none;
        text-align: center;
      }
    }
  }
}
.uls{
    width: 100%;
    margin-top: 15px;
  
}
.lis{
    width: 100%;
    height: 1rem;
    position: relative;
    background: #fff;
    border-bottom: 2px solid #eee;
    &>p{
        width: 100%;
        height: .45rem;
        line-height: .45rem;
        padding-left: 10px;
    }
   
    &>p:nth-child(2),.confirm{
        font-size: .18rem;
        color: #666;
        span{
            padding: 0 5px;
            color: #666;
        }
    }
}

.tasks{
    font-size: .25rem;
    font-weight: bold;
    
}
.confirm_alter{
    position: absolute;
    right: 10px;
    top: 20px;
    width: .3rem;
    height: .3rem;
    background: #ccc;
    border-radius: 50%;
}
.confirm_alter_col{
  background: greenyellow;
}
.confirm_del{
    position: absolute;
    right: 10px;
    top: 50px;
    width: .7rem;
    text-align: center;
    line-height: 28px;
    height: .3rem;
    background: pink;
    font-size: .17rem;
    color: #666;

}
.alter{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 60px;
    text-align: center;
    line-height: 28px;
    height: 28px;
    background: #eee;
    font-size: .17rem;
    color: #666;
    font-weight: normal;
}
</style>
