<template>
  <div class="GroupList">
     <div class="header">
        任务列表
        <span class="span_col" @click="goGit">
          <a target="_blank" href="https://www.baidu.com/" >查看代码</a>
        </span>
    </div>
    <section>
      <div
        class="GroupContent"
        v-for="(item,index) in memList"
        :key="item.mid"
        :data-index="index"
        @click="taskList(item.member_id,item.team_id,item.identity)"
      >
        <dl class="leftGroup">
          <dt></dt>
          <dd>
            <span>{{item.member_name}}</span>
            <p>{{item.identity}}</p>
          </dd>
        </dl>
        <p class="rightGroup">
          <span @click.stop="delMem(item.member_id)">删除</span>
          <i class="el-icon-arrow-right"></i>
        </p>
      </div>
      <Dialog v-show="flag">
        <!-- v-if v-show -->

        <spam>添加成员</spam>
        <div class="input">
          <input type="text" placeholder="请输入姓名" v-model="memName">
          <el-radio class="radio" :disabled="radioFlag" v-model="radio" label="1">组长</el-radio>
          <el-radio class="radio" v-model="radio" label="2">组员</el-radio>
        </div>
        <div class="btn">
          <p @click="createMem">确定</p>
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
export default {
  name: "GroupMember",
  components: {
    HeadTit,
    createBtn,
    Dialog
  },
  data() {
    return {
      tit: "小组成员",
      createBtn: "添加成员",
      search: "",
      flag: false,
      radio: "1",
      radioFlag: false,
      memName: "",
      memList: [],
      num: 1
    };
  },
  created() {
    this.getMem();
  },
  methods: {
    goGit(){

    },
    showDialog(val) {
      this.flag = !val;
    },
    createMem() {
      this.flag = !this.flag;
      if (this.memName) {
        let query = new URLSearchParams();
        query.append("member_name", this.memName);
        query.append("team_id", this.$route.query.tid);
        query.append("identity", this.radio);
        fetch("/createMember", {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body: query.toString()
        })
          .then(res => res.json())
          .then(res=>{
            if(res.code == 1){
               this.getMem();
            }else{

            }
           
          })
        
        // this.memName = "";
        // this.radio = "1";
      } else {
       
        this.$dialog({title:'姓名不能为空'})
      }
    },
    getMem() {
      let query = new URLSearchParams();
      query.append("team_id", this.$route.query.tid);
      fetch(`/teamMembers?${query.toString()}`)
        .then(res => res.json())
        .then(res => {
          let manger = res.result.findIndex(item => item.identity == 1);
          if (manger != -1) {
            this.radioFlag = true;
          } else {
            this.radioFlag = false;
          }
          this.memList = res.result.map(item => {
        
            if (item.identity === 2) {
              item.identity = "组员";
            } else if (item.identity === 1) {
              item.identity = "组长";
            }
            return item;
          });
        });
    },
    delMem(mid) {
      fetch(`/deleteMember?mid=${mid}`)
        .then(res => res.json())
        .then(res => {

          if(res.code == 1){
            this.$dialog({title:'删除成功'})
           
            let index = this.memList.findIndex(ele=>ele.member_id == mid);
            this.memList.splice(index,1);
          }else{
            this.$dialog({title:'你还有任务没有清除'})
          }

        });
    
    },
    taskList(mid, tid,identity) {
      this.$router.push(
        `/taskList?member_id=${mid}&team_id=${tid}&project_id=${this.$route.query.project_id}&identity=${identity=='组长'?1:2}`
      );
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
        width: auto;
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
        font-weight: normal;
        font-size: .17rem;
        border-radius: 2px;
        background: #eee;
        color: #666;
        border: 1px solid #ccc;
      }
  }
  section {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    overflow-y: auto;
    .GroupContent {
      width: 100%;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      .leftGroup {
        margin-left: 20px;
        display: flex;
        align-items: center;
      
        dt {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          background: orange;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        dd {
          flex-shrink: 0;
          font-size: .22rem;
          p {
            font-size: .16rem;
            color: #ccc;
          }
        }
      }
      .rightGroup {
        width: 80px;
        height: 100%;
        flex: 5;
        padding-right: 10px;
        font-size: .23rem;
        text-align: right;
        line-height: 45px;
        &>span{
          padding: 0 10px;
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

