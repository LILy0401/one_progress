<template>
  <div class="home">
      <div class="home_header">

      </div>
      <div class="content_box">
        <p class="con_box_p">注册</p>
        <p class="con_box_mes"> <input type="text" placeholder="用户名" v-validator="name" v-model="user_name"></p>
        <p class="con_box_mes"> <input type="password" placeholder="密码" v-validator="pwd" v-model="user_pwd"></p>
        <p class="con_box_mes"> <input type="text" placeholder="用户昵称"  v-validator="nick" v-model="nickname"></p>
        <p class="con_box_mes"> <input type="text" placeholder="身份" v-validator="person" v-model="role"></p>
        <p class="con_box_mes"> <input type="text" placeholder="手机号" v-validator="phones" v-model="phone"></p>
        <p class="con_box_mes"> <input type="text" placeholder="性别" v-validator='genderreg' v-model="gender"></p>
        
        <p class="con_box_btn">
          <button @click='zuce'>注册</button>
        </p>
      </div>
  </div>
</template>

<script>

// @ is an alias to /src

export default {
  data(){
    return{
      name:{con:/[\u4E00-\u9FA5]*\w{4,}/,hint:'大于4位的字母或者中文或者数字组成'},
      pwd:{con:/\w{6,}/,hint:'长度必须大于六'},
      nick:{con:/^\w{4,}$/,hint:'用户昵称格式不正确'},
      person:{con:/[组长|组员]$/,hint:'必须是组长或组员'},
      phones:{con:/^1[3-8]\d{9}$/,hint:'请输入你真实的手机号,ok？'},
      genderreg:{con:/^[男|女]$/,hint:'这也能填错,怀疑..'},
      user_name:'',
      user_pwd:'',
      nickname:'',
      phone:'',
      role:'',
      gender:''
    }
  },
  components: {
    
  },
  methods:{
    zuce(){
     
      if(this.user_name && this.user_pwd &&this.nickname && this.phone &&this.gender &&this.role){
         this.$http.post('/register',{
            user_pwd:this.user_pwd,
            user_name:this.user_name,
            nickname:this.nickname,
            phone:this.phone,
            role:this.role,
            gender:this.gender,
            headers:{
              'content-type':'application/json'
            }
          }).then(res=>{
        
              if(res.code == 1){
               this.$dialog({title:'注册成功'})
                setTimeout(()=>{
                  this.$router.push('/');
                },1000)
                
              }else{
                this.$dialog({title:'注册失败'})
                
              }
          })
      }else{
          this.$dialog({title:'请填写全部信息'})
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
  height: auto;
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
    margin-bottom: 10px;
    background: #009788;
    color: #fff;
    font-size: 19px;
  }
}
</style>

