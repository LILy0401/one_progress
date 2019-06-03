<template>
  <div class="home">
      <div class="home_header">

      </div>
      <div class="content_box">
        <p class="con_box_p">登录</p>
        <p class="con_box_mes"> <input type="text" placeholder="用户名" v-model="user_name"></p>
        <p class="con_box_mes"> <input type="text" placeholder="密码" v-model="user_pwd"></p>
        <div class="con_box_yan">
           <input type="text" placeholder="验证码" v-model="verify">
           <p>
              <span v-html="svg" @click="checksvg"></span>
           </p>
          
        </div>
        <p class="con_box_rem">
          
          <label class="label_inp">
              <input type="checkbox" name="a"> 记住我
          </label>
        
          <span class="forget_me">忘记密码？</span>
        </p>
        <p class="con_box_btn">
          <button @click="logins">登录</button>
          
        </p>
        <span class="zhuce" @click="go_register">去注册</span>
      </div>
  </div>
</template>

<script>

// @ is an alias to /src

export default {
  name: 'home',
  data(){
    return{
      verify:'',
      user_name:'',
      user_pwd:'',
      svg:''
    }
  },
  created(){
    this.captcha();
  },
  components: {
      
  },
  methods:{
    
    captcha(){
        this.$http.get('/captcha').then(res=>{
           console.log(res);
           this.svg = res.data;
           
           window.sessionStorage.setItem('count',res.count);
           
        })
    },
    checksvg(){
        this.captcha();
    },
    go_register(){
      setTimeout(()=>{
          this.$router.push('/register')
      },1000)
    },
    logins(){
      let count = sessionStorage.getItem('count');
      if(this.user_name&&this.user_pwd&&this.verify){
          this.$http.post('/login',{
            user_name:this.user_name,
            user_pwd:this.user_pwd,
            verify:this.verify,
            count:count
          }).then(res=>{
            console.log(res);
            if(res.code == 1){
              document.cookie = `token=${res.token}`;
              this.$message('登录成功');
              setTimeout(()=>{
                 this.$router.push('/page')
              },1000)
             
            }else{
              

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
    &>p{
      display: block;
      background: pink;
      width: 40%;
      // overflow: hidden;
      height: 35px;
      margin-right: 0;
      text-align: center;
      line-height: 35px;
      font-size: 18px;
    }
}
.con_box_rem{
  width: 80%;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  .label_inp{
    margin-left: 0;
    font-size: 15px;
  }
 .forget_me{
    margin-right: 0;
    color: #009788;
    font-size: 15px;
  }
}

.con_box_btn{
  width: 100%;
  height: 60px;
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
.zhuce{
   
    height: 20px;
    line-height: 20px;
    color: #009788;
    font-size: 14px;
  }
</style>

