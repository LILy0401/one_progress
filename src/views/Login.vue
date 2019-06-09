<template>
  <div class="home">
      <div class="home_header">

      </div>
      <div class="content_box">
        <p class="con_box_p">登录</p>
        <p class="con_box_mes"> <input type="text" placeholder="用户名" v-validator="test" v-model="user_name"></p>
        <p class="con_box_mes"> <input type="password" placeholder="密码" v-validator="pwd" v-model="user_pwd"></p>
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
          <button @click="logins">学生登录</button>
          <button @click="teacher_logins">老师登录</button>
        </p>
        <span class="zhuce" @click="go_register">去注册</span>
      </div>
  </div>
</template>

<script>
import cookies from 'js-cookie';
import { constants } from 'crypto';
export default {
  name: 'home',
  data(){
    return{
      test:{con:/[\u4E00-\u9FA5]*[a-zA-Z0-9]{2,}/,hint:'用户名规则不正确'},
      pwd:{con:/[a-zA-Z]+[0-9]*/,hint:'密码格式错误'},
      verify:'',
      user_name:'',
      user_pwd:'',
      svg:'',
      type:'student'
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
      this.type = 'student';
      window.localStorage.setItem('type',this.type)
      
      if(this.user_name&&this.user_pwd&&this.verify){
          this.$http.post('/login',{
            user_name:this.user_name,
            user_pwd:this.user_pwd,
            captcha:this.verify,
            count:count
          }).then(res=>{
            console.log(res);
            if(res.code == 1){
             cookies.set('token',res.token)
              this.$dialog({title:'登录成功'})
              window.localStorage.setItem('role',res.message[0].role);
              window.localStorage.setItem('name',this.user_name)
              window.localStorage.setItem('sid',res.message[0].sid)
              if(!res.message[0].cid){
                  setTimeout(()=>{
                    this.$router.push({
                      path:'/classlist',
                      query:{
                        sid:res.message[0].sid
                      }
                    })
                  },1000)
              }else{
                  let local_sid = localStorage.getItem(res.message[0].sid)
                  console.log(local_sid,'-----------------local_sid')
                 
                if(local_sid){
                    setTimeout(()=>{
                      this.$router.push({
                        path:'/GroupMember',
                        query:{
                          tid:local_sid
                        }
                      })
                    },1000)
                }else{
                    console.log(res.message[0].cid,'-----login')
                   setTimeout(()=>{
                    this.$router.push({
                      path:'/projectEntry',
                      query:{
                        cid:res.message[0].cid,
                        sid:res.message[0].sid,
                        calss_name:res.message[0].calss_name
                      }
                    })
                  },1000)
                }
               
              }
             
             
            }else{
               this.$dialog({title:res.message})
            }
          })
      }else{
         this.$dialog({title:'请填写全部信息'})
       
      }
        
    },
    teacher_logins(){
      
      this.type = 'teacher';
      window.localStorage.setItem('type',this.type);
      if(this.user_name&&this.user_pwd){
          this.$http.post('/teacheLogin',{
              user_name:this.user_name,
              user_pwd:this.user_pwd
          }).then(res=>{
          
            if(res.code == 1){
              cookies.set('token',res.token)
              this.$dialog({title:'老师登录成功'})
          
              setTimeout(()=>{
                  this.$router.push('/classlist');
              },1000)
            }else{
              this.$dialog({title:'老师登录失败'})
            }
          })
      }else{
         this.$dialog({title:'请输入用户名和密码'})
      }
     
    }
  }
}
</script>
<style lang='scss'>
.home{
  width: 100%;
  height: 100%;
  background: #e7e7e7;
  position: relative;
  overflow: hidden;
}
.home_header{
  width: 100%;
  height: 50%;
  background: #009788;
}

.content_box{
  width: 355px;
  height: 450px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.con_box_p{
  width: 100%;
  height: .7rem;
  text-align: center;
  line-height: .7rem;
  font-size: .22rem;
  font-weight: bold;
}
.con_box_mes{
  width: 80%;
  height: 65px;
  text-align: center;
  line-height: 65px;
  position: relative;
  &>input{
    width:100%;
    height: 40px;
    padding-left: 20px;
    border: 1px solid #ccc;
  }
}
.con_box_yan{
    width: 80%;
    height: .7rem;
    margin-top: 10px;
    text-align: center;
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
      width: 40%;
      margin-right: 0;
      text-align: center;
      font-size: .18rem;
      svg{
        
        width: 100%;
        height: 40px;
      }
    }
}
.con_box_rem{
  width: 80%;
  height: 50px;
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
  height: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  &>button{
    width: 80%;
    height: 35px;
    margin-bottom: 10px;
    border: none;
    background: #009788;
    color: #fff;
    font-size: .23rem;
  }
}
.zhuce{
    width: 100%;
    display: block;
    text-align: center;
    height: 20px;
    line-height: 20px;
    color: #009788;
    font-size: 14px;
  }
</style>
