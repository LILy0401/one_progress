<template>
  <div class="home">
      <div class="home_header">

      </div>
      <div class="content_box">
        <p class="con_box_p">注册</p>
        <p class="con_box_mes"> <input type="text" placeholder="用户名" v-model="user_name"></p>
        <p class="con_box_mes"> <input type="text" placeholder="密码" v-model="user_pwd"></p>
      
        <p class="con_box_btn">
          <button @click='zuce'>注册</button>
        </p>
      </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
// @ is an alias to /src

export default {
  data(){
    return{
      user_name:'',
      user_pwd:''
    }
  },
  components: {
  
  },
  methods:{
    zuce(){
      
      if(this.user_name && this.user_pwd){
         this.$http.post('/register',{
            user_pwd:this.user_pwd,
            user_name:this.user_name,
            headers:{
              'content-type':'application/json'
            }
          }).then(res=>{
            console.log(res);
              if(res.code == 1){
                this.$message('注册成功');
                setTimeout(()=>{
                  this.$router.push('/');
                },1000)
                
              }else{
                this.$message('注册失败')
              }
          })
       
       
      }else{

         this.$message('请填写全部信息') 
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.home{
  width: 100%;
  height: 100%;
  background: #e7e7e7;
  position: relative;
}
.home_header{
  width: 100%;
  height: 50%;
  background: #009788;
}
.content_box{
  width: 355px;
  height: 370px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  // right: 0;
  // bottom: 0;
  transform: translate(-50%,-50%)
  // margin: auto;
}
.con_box_p{
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
  font-weight: bold;
}

.con_box_yan{
    width: 80%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    display: flex;
    align-items: center;
    &>input{
      width: 55%;
      height: 35px;
      padding-left: 20px;
      border: 1px solid #ccc;
      margin-left: 0;
    }
    &>span{
      display: block;
      background: pink;
      width: 40%;
      height: 35px;
      margin-right: 0;
      text-align: center;
      line-height: 35px;
      font-size: 20px;
    }
}
.con_box_mes{
  width: 80%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  &>input{
    width:100%;
    height: 35px;
    padding-left: 20px;
    border: 1px solid #ccc;
  }
}
.con_box_btn{
  width: 100%;
  height: 50px;
  line-height: 50px;
  &>button{
    width: 80%;
    height: 35px;
    border: none;
    background: #009788;
    color: #fff;
    font-size: 19px;
  }
}
</style>

