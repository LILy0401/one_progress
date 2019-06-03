<template>
  <div id="nav">
    <HeadTit :tit="tit"></HeadTit>
    <section>
      <div
        class="project"
        v-for="(item,index) in list"
        :key="index"
        @click="GroupList(item.project_id)"
      >
        <h4>{{item.project_name}}</h4>
        <div class="projects">
          <p>{{item.project_discription}}</p>
          <div class="mananer">
            <span>创建时间:{{item.create_time}}</span>
            <span>|</span>
            <span @click.stop="delPro(item.project_id)">删除</span>
          </div>
        </div>
      </div>
      <createBtn :createBtn="createBtn" :flag="flag" @showDialog="showDialog"></createBtn>
      <Dialog v-show="flag">
        <!-- v-if v-show -->

        <h3>创建项目</h3>
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
    <footer>
      <el-select v-model="cid" placeholder="选择班级" @change="chooseClass()">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </footer>
  </div>
</template>
<script>
import HeadTit from "../components/headerTit.vue";
import createBtn from "../components/createBtn.vue";
import Dialog from "../components/dialog.vue";

export default {
  name: "ProjectEntry",
  data() {
    return {
      tit: "项目列表-----班级",
      list: [],
      options2: [
        {
          value: "1606A",
          label: "1606A"
        },
        {
          value: "1606B",
          label: "1606B"
        },
        {
          value: "1607A",
          label: "1607A"
        },
        {
          value: "1607B",
          label: "1607B"
        },
        {
          value: "1608A",
          label: "1608A"
        },
        {
          value: "1608B",
          label: "1608B"
        },
        {
          value: "1609A",
          label: "1609A"
        },
        {
          value: "1609B",
          label: "1609B"
        },
        {
          value: "1610A",
          label: "1610A"
        },
        {
          value: "1610B",
          label: "1610B"
        }
      ],
      cid: "1610A",
      createBtn: "创建项目",
      flag: false,
      proName: "",
      proMS: ""
    };
  },
  components: {
    HeadTit,
    createBtn,
    Dialog
  },
  created() {
    this.projectList();
  },
  methods: {
    showDialog(val) {
      this.flag = !val;
    },
    projectList() {
      this.$ajax.get(`/projectList?cid=${this.cid}`).then(res => {
        this.list = res.data.results.map(item => {
          item.create_time = new Date(item.create_time * 1).toLocaleString();
          return item;
        });
      });
    },
    createPro() {
      this.flag = !this.flag;
      if (this.proName && this.proMS) {
        this.$ajax
          .post("/createProject", {
            project_name: this.proName,
            project_discription: this.proMS,
            cid: this.cid,
            class_name: this.cid
          })
          .then(res => {
            console.log(res);
          });
        this.projectList();
        this.proName = "";
        this.proMS = "";
        this.cid = "1610A";
      } else {
        alert("请检查项目名称及项目描述是否填写");
      }
    },
    chooseClass() {
      this.projectList();
    },
    GroupList(pid) {
      this.$router.push(`/GroupList?pid=${pid}`);
      // this.$router.push({
      //   path:'/GroupList',
      //   query:{
      //     pid
      //   }
      // })
    },
    delPro(pid){
      // this.$ajax.get(`/deleteProject?project_id=${pid}`).then(res=>{
      //     console.log(res)
      //   })
      alert('删除'+pid+'正在开发中')
    }
  }
};
</script>
<style lang="scss">
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
  height: 100px;
  margin-top: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  flex-shrink: 0;
  h4 {
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    padding-left: 5px;
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
      display: flex;
      margin-top: 8px;
      span {
        margin-right: 5px;
        font-size: 12px;
        color: #ccc;
      }
      span:nth-child(1){
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
  }
  footer {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    .el-select {
      .el-input {
        input {
          outline: none;
          border: none;
          text-align: center;
        }
        ::-webkit-input-placeholder {
          color: #000;
        }
      }
    }
  }
}
</style>
