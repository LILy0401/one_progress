<template>
  <div class="GroupList">
    <HeadTit :tit="tit"></HeadTit>
    <section>
      <div
        class="GroupContent"
        v-for="(item,index) in listGro"
        :key="item.team_id"
        :data-index="index"
        @click="GroupMember(item.team_id)"
      >
        <p class="leftGroup">
          <b>{{item.team_name}}</b>
        </p>
        <p class="rightGroup">
          <!-- <el-slider v-model="sliderVal"></el-slider> -->
          <Process :step="'50%'"></Process>
          <span @click.stop="delGroup(item.team_id)">删除</span>
          <span>编辑</span>
        </p>
      </div>
      <Dialog v-show="flag">
          <!-- v-if v-show -->
          <h3>添加小组</h3>
          <div class="input">
            <input type="text" placeholder="请输入小组名称" v-model="groName">
            <textarea name="" id="" cols="30" rows="10" placeholder="小组项目仓库地址" v-model="groMS"></textarea>
          </div>
          <div class="btn">
            <p @click="createGro">确定</p>
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
import Process from "../components/process.vue";
import createBtn from "../components/createBtn.vue";
import Dialog from "../components/dialog.vue";
export default {
  name: "GroupList",
  components: {
    Process,
    createBtn,
    Dialog
  },
  data() {
    return {
      tit: "小组名称",
      createBtn: "添加小组",
      search: "",
      sliderVal: 0,
      flag: false,
      groName: "",
      groMS: "",
      pid:window.location.hash.split("?")[1].split("=")[1],
      listGro: []
    };
  },
  created() {
    console.log(this.$route.query.pid)
    this.getGro();
    //原生解析
    // this.pid =  window.location.hash.split("?")[1].split("=")[1];
    // console.log(this.pid)
  },
  methods: {
    showDialog(val) {
      this.flag = !val;
    },
    GroupMember(tid) {
      this.$router.push(`/GroupMember?tid=${tid}&pid=${this.$route.query.pid}`);
    },
    createGro() {
      this.flag = !this.flag;
      if (this.groName && this.groMS) {
        this.$ajax
          .get(
            `/createTeam?teamName=${this.groName}&gitAddr=${this.groMS}&pid=${
              this.$route.query.pid
            }`
          )
        this.groName = "";
        this.groMS = "";
        this.getGro();
      } else {
        alert("请检查小组名称及小组描述是否填写");
      }
    },
    getGro() {
      this.$ajax.get(`/teamlist?pid=${this.$route.query.pid}`).then(res => {
        this.listGro = res.data.results;
      });
    },
    delGroup(tid){
      this.$ajax.get(`/deleteTeam?team_id=${tid}`);
      this.getGro()
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
    .GroupContent {
      width: 100%;
      height: 45px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .leftGroup {
        margin-left: 20px;
        width: 40px;
        font-size: 14px;
        b {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          margin:0 3px;
          flex-shrink: 0;
        }
        span:nth-child(2){
          background: red;
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

