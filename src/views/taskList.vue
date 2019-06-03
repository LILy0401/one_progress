<template>
  <div class="GroupList">
    <HeadTit :tit="tit"></HeadTit>
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
      <div class="content" v-if="ind===0">
        <div v-for="(item,index) in taskList" :key="index" :data-index="index">
          <div class="left">
            <p class="leftTit">{{item.task_name}}</p>
            <p class="leftList">
              <span @click="beginTodo(index)">开始</span>
              <span @click="delTask(item.tid)">删除</span>
              <span>创建时间</span>
            </p>
          </div>
          <div class="right" @click="setTaskName(item.task_name)">修改</div>
        </div>
      </div>
      <div class="content" v-if="ind===1">
        <div v-for="(item,index) in taskList" :key="index" :data-index="index">
          <div class="left">
            <p class="leftTit">{{item.task_name}}</p>
            <p class="leftList">
              <span>doing</span>
              <span>完成</span>
              <span>审核人</span>
            </p>
          </div>
          <div class="right " :class="index===doingIndex?'doing':''">doing</div>
        </div>
      </div>
      <div class="content" v-if="ind===2">
        <div v-for="(item,index) in taskList" :key="index" :data-index="index">
          <div class="left">
            <p class="leftTit">{{item.task_name}}</p>
            <p class="leftList">
              <span>开始</span>
              <span>完成</span>
              <span>确认人</span>
            </p>
          </div>
          <div class="right">确认</div>
        </div>
      </div>
      <Dialog v-show="flag">
        <!-- v-if v-show -->

        <h3>{{task}}任务</h3>
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
      tit: "任务表",
      createBtn: "添加",
      navList: ["todo", "doing", "done"],
      search: "",
      flag: false,
      ind: 0,
      task: "",
      taskName: "",
      taskList: [],
      inpname: "请输入任务描述",
      step: "0%",
      doingIndex:''
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    showDialog(val, task) {
      this.task = task;
      this.flag = !val;
      this.inpname = "请输入任务描述";
    },
    changeNav(ind) {
      this.ind = ind;
    },
    createTask() {
      if (this.taskName) {
        this.$ajax.post("/createTask", {
          task_name: this.taskName,
          mid: this.$route.query.mid,
          team_id: this.$route.query.team_id,
          pid: this.$route.query.pid
        });
        this.flag = !this.flag;
        this.getTask();
      } else {
        alert("taskName不能为空");
        this.flag = !this.flag;
      }
    },
    getTask() {
      this.$ajax.get(`/tasksList?mid=${this.$route.query.mid}`).then(res => {
        console.log(res);
        if (res.data.results.length) {
          this.taskList = res.data.results;
          this.step = "33.33%";
        }else{
            this.taskList = res.data.results;
          this.step = "0%";
        }
      });
    },
    delTask(tid) {
      this.$ajax.get(`/deleteTask?tid=${tid}&mid=${this.$route.query.mid}`);
      this.getTask();
    },
    setTaskName(name) {
      this.flag = true;
      this.task = "修改";
      this.inpname = name;
    },
    changeTask() {
      alert("端口开发中");
      this.flag = false;
    },
    beginTodo(doingIndex) {
      console.log(doingIndex)
      this.doingIndex=doingIndex;
      this.step = "66.66%";
      this.ind = 1;
    }
  }
};
</script>
<style lang='scss'>
.GroupList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f1f1;
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
        height: 30px;
        text-align: center;
        line-height: 30px;
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
            font-size: 14px;
          }
          .leftList {
            font-size: 12px;
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
          font-size: 12px;
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
</style>

