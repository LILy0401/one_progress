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
  
          <Process :step="'50%'"></Process>
          <span @click.stop="delGroup(item.team_id)">删除</span>
          <span>编辑</span>
        </p>
      </div>
      <Dialog v-show="flag">
  
          <span>添加小组</span>
          <div class="input">
            <input type="text" placeholder="请输入小组名称" v-model="groName">
            <textarea name="" id="" cols="30" rows="10" placeholder="小组项目仓库地址" v-model="groMS"></textarea>
          </div>
          <div class="btn">
            <p @click="createGro">确定</p>
            <p @click="showDialog">取消</p>
          </div>
        </Dialog>
      <createBtn :createBtn="createBtn" :flag="flag" @showDialog="showDialog" v-show="groupisShow"></createBtn>
    </section>
  
  </div>
</template>

<script>
import Process from "../components/process.vue";
import createBtn from "../components/createBtn.vue";
import Dialog from "../components/dialog.vue";
export default {
  components: {
    Process,
    createBtn,
    Dialog
  },
  data() {
    return {
      tit: "小组名称",
      createBtn: "添加小组",
      groupisShow:false,
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
    this.getGro();
    this.getRole();
  },
  methods: {
    getRole(){
        let role = localStorage.getItem('role');
        if(role == 1){
          this.groupisShow = true;
        }else{
          this.groupisShow = false;
        }
    },
    showDialog(val) {
      this.flag = !val;
    },
    GroupMember(tid) {
      let sid = localStorage.getItem('sid');
      if(sid){
        localStorage.setItem(sid,tid);
      }
      this.$router.push(`/GroupMember?tid=${tid}&project_id=${this.$route.query.project_id}`);
    },
    createGro() {
      this.flag = !this.flag;
      if (this.groName && this.groMS) {
        this.$http.post('/createTeam',{
          teamName:this.groName,
          gitAddr:this.groMS,
          pid:this.$route.query.project_id,
        }).then(res=>{
        
           if(res.code == 1){
             this.$dialog({title:'添加成功'})
             
           }else{
             this.$dialog({title:'添加失败'})
           }
        })
        this.groName = "";
        this.groMS = "";
        this.getGro();
      } else {
         this.$dialog({title:'请检查小组名称及小组描述是否填写'})
    
      }
    },
    getGro() {
      this.$http.get(`/teamlist?pid=${this.$route.query.project_id}`).then(res => {
        
        this.listGro = res.results;
      });
    },
    delGroup(tid){

      this.$http.get(`/deleteTeam?team_id=${tid}`).then(res=>{
        if(res.code == 1){

          this.$dialog({title:'删除成功'});
          let index = this.listGro.findIndex(ele=>ele.team_id == tid);
          this.listGro.splice(index,1);
        }else{
            this.$dialog({title:'你的小组内还有成员'})
        } 
      });
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
        width: 13%;
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        b{
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
        overflow: hidden;
        .el-slider {
          width: 50%;
          margin-right: 20px;
        }
        span {
          width: 50px;
          height: 100%;
          font-size: .18rem;
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
  
}
</style>

