<template>
  <div class="GroupList">
    <HeadTit :tit="tit"></HeadTit>
    <section>
      <div
        class="GroupContent"
        v-for="(item,index) in memList"
        :key="item.mid"
        :data-index="index"
        @click="taskList(item.mid,item.team_id)"
      >
        <dl class="leftGroup">
          <dt></dt>
          <dd>
            <h3>{{item.member_name}}</h3>
            <p>{{item.identity}}</p>
          </dd>
        </dl>
        <p class="rightGroup">
          <b @click.stop="delMem(item.mid)">删除</b>
          <i class="el-icon-arrow-right"></i>
        </p>
      </div>
      <Dialog v-show="flag">
        <!-- v-if v-show -->

        <h3>添加成员</h3>
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
    showDialog(val) {
      this.flag = !val;
    },
    createMem() {
      this.flag = !this.flag;
      console.log(this.radio)
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
        this.getMem();
        this.memName = "";
        this.radio = "1";
      } else {
        alert("姓名不能为空");
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
            //  item.identity=res.result[manger].identity.splice(manger,1,2)
            if (item.identity === 0) {
              item.identity = "老师";
            } else if (item.identity === 1) {
              item.identity = "组长";
            }else{
              item.identity = "组员";
            }
            return item;
          });
        });
    },
    delMem(mid) {
      // this.$ajax
      //   .get("/deleteMember", {
      //     params: {
      //       mid
      //     }
      //   })
      fetch(`/deleteMember?mid=${mid}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
        });
      this.getMem();
    },
    taskList(mid, tid, pid) {
      this.$router.push(
        `/taskList?mid=${mid}&team_id=${tid}&pid=${this.$route.query.pid}`
      );
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
          p {
            font-size: 12px;
            color: #ccc;
          }
        }
      }
      .rightGroup {
        height: 45px;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-slider {
          width: 50%;
          margin-right: 20px;
        }
        span {
          width: 50px;
          height: 100%;
          background: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
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

