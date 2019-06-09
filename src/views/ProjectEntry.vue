<template>
  <div id="nav">
    <HeadTit :tit="`项目列表--`"></HeadTit>
    <section>
      <div
        class="project"
        v-for="(item,index) in list"
        :key="index"
        @click="GroupList(item.project_id)"
      >
        <span>{{item.project_name}}</span>
        <div class="projects">
          <p>{{item.project_discription}}</p>
          <div class="mananer">
            <span>创建时间:{{item.create_time}}</span>
            <span>|</span>
            <span @click.stop="delPro(item.project_id)">删除</span>
          </div>
        </div>
      </div>

      <createBtn :createBtn="createBtn" :flag="flag" @showDialog="showDialog" v-show="createBtnisShow"></createBtn>
     
      <Dialog v-show="flag">
    
        <span>创建项目</span>
        <div class="input">
          <input type="text" placeholder="请输入项目名称" v-model="proName">
          <textarea name="" id="" cols="30" rows="10" placeholder="添加项目介绍" v-model="proMS"></textarea>
        </div>
        <div class="btn">
          <p @click="createPro">确定</p>
          <p @click="showDialog">取消</p>
        </div>
      </Dialog>
    </section>
  </div>
</template>
<script>
import HeadTit from "../components/headerTit.vue";
import createBtn from "../components/createBtn.vue";
import Dialog from "../components/dialog.vue";
import { constants } from 'crypto';
import store from '../store'

export default {
  data() {
    return {
      createBtnisShow:false,
      tit: "",
      list: [],
      onlyList:[],
      cid: "",
      createBtn: "创建项目",
      flag: false,
      proName: "",
      proMS: "",
      checkoutList:[]
    };
  },
  computed:{
    
    getclassList(){
        // console.log(this.cid);
        // console.log(store.state.data)
        let arr=store.state.data.filter((ele)=>{
          
          return ele.cid == this.cid
        })
        console.log(arr);
        // this.tit = arr[0].class_name;
        // console.log(this.tit);
        return arr;
    }
  },
  components: {
    HeadTit,
    createBtn,
    Dialog
  },
  created() {
    this.cid = this.$route.query.cid;
    // this.tit = this.$route.query.class_name;
    // this.getclassList;
    this.getType();
    this.projectList();
    
  },
  methods: {
    getType(){
      let type = window.localStorage.getItem('type');
      if(type === 'teacher'){
        this.createBtnisShow = true;
      }else{
        this.createBtnisShow = false;
      }
    },
    showDialog(val) {
      this.flag = !val;
    },
    projectList() {
      console.log(this.cid ,',-------项目中')
      this.$http.get(`/projectList?cid=${this.cid}`).then(res => {
        
        this.list = res.results.map(item => {
          let data = new Date(item.create_time)
          item.create_time = `${data.getFullYear()}年-${data.getMonth()+1}月-${data.getDate()}日`;
          return item;
        });
      });
    },
    createPro() {
    
      this.flag = !this.flag;
      if (this.proName && this.proMS) {
        
        this.$http
          .post("/createProject", {
            project_name: this.proName,
            project_discription: this.proMS,
            cid: this.cid,
            class_name: this.tit
          })
          .then(res => {
            console.log(res);
            if(res.code == 1){
               this.$dialog({title:'删除成功'})
            }else{
              this.$dialog({title:'删除失败'})
            }
          });
        this.projectList();
        this.proName = "";
        this.proMS = "";
      } else {
        this.$dialog({title:'请检查项目名称及项目描述是否填写'})
        
      }
    },
    chooseClass() {
      this.projectList();
    },
    GroupList(pid) {
     
      this.$router.push(`/GroupList?project_id=${pid}`);
    },
    delPro(pid){

      this.$http.get(`/deleteProject?project_id=${pid}`).then(res=>{
      
          if(res.code == 1){
            this.$dialog({title:'删除成功'})
            let index = this.list.findIndex(ele=>ele.project_id == pid);
           
            this.list.splice(index,1);
          }else{
             this.$dialog({title:'删除失败'})
          }
      })
      
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (min-width:320px){
    #nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;
  section {
    width: 95%;
    flex: 1;
    display: flex;
    padding: 0 2.5%;
    overflow-y: auto;
    .project {
  width: 33%;
  height: 100px;
  margin-top: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  flex-shrink: 0;
  &>span {
    display: inline-block;
    width: 100%;
    height: 25px;
    background: rgb(165, 208, 248);
    line-height: 25px;
    border-bottom: 1px solid #95c3ff;
    font-size:.22rem;
    padding-left: 10px;
  }
  .projects {
    width: 98%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding-left: 5px;
    p {
      font-size: .19rem;
      color: #ccc;
      width: 95%;
    }
    .mananer {
      width: 100%;
      height: 35px;
      line-height: 35px;
      display: flex;
      margin-top: 8px;
      span{
      
        text-align: left;
        font-size: .16rem;
        color: #bbb;
      }
      span:nth-child(1){
        flex: 7;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
  }

}
.btn{
  p{
    font-size: .2rem;
  }
}
}
@media screen and (max-width:420px){
  #nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #eee;
  section {
    width: 95%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 2.5%;
    overflow-y: auto;
    .project {
  width: 100%;
  height: 1.8rem;
  margin-top: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  flex-shrink: 0;
  &>span {
    display: inline-block;
    width: 100%;
    height: 25px;
    background: rgb(165, 208, 248);
    line-height: 25px;
    border-bottom: 1px solid #95c3ff;
    font-size:.22rem;
    padding-left: 10px;
  }
  .projects {
    width: 98%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding-left: 5px;
    p {
      font-size: 12px;
      color: #ccc;
      width: 95%;
    }
    .mananer {
      width: 100%;
      height: 35px;
      line-height: 35px;
      display: flex;
      margin-top: 8px;
      span{
      
        text-align: left;
        font-size: 12px;
        color: #bbb;
      }
      span:nth-child(1){
        flex: 7;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
  }

}
}

</style>
