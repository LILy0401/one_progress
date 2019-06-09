<template>
    <transition>
        <div class="box" v-show="isShow">
            {{title}}
        </div>
    </transition>
</template>
<script>

export default {
    data(){
        return{
            
        }
    },
    created(){
        let that = this;
        // console.log(this.$el);
        // setTimeout(()=>{
        //     console.log('111');
        //     that.$el.parentNode.removeChild(that.$el)
        // },1000)
    },
    methods:{

        // comfirms(){
        //    this.$el.parentNode.removeChild(this.$el)
           
        // },
        // cancle(){
        //     this.$el.parentNode.removeChild(this.$el)
        // }
    }
}
</script>
<style scoped>
.v-enter{
    opacity: 0;
}
.v-enter-to{
    opacity: 1;
}
.v-enter-active{
   transition: opacity linear 1s;
}
.v-leave{
    opacity: 1;
}
.v-leave-to{
    opacity: 0;
}
.v-leave-active{
   transition: opacity linear 1s;
}
.box{
    width:350px;
    height: 45px;
    background: rgba(255, 255, 255, .8);
    border: 1px solid #ccc;
    box-shadow: 3 3 4 #999;
    z-index: 999;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 17px;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
    color: #666;
}
.box_content{
    width: 60%;
    height: 200px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* transform: translate(-50%,-50%); */
}
</style>

