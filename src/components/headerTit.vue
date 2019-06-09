<template>
  <header>
    <span>{{tit}}</span>
  </header>
</template>
<script>
export default {
  name: "HeadTit",
  props: ["tit"],
  data(){
    return{
      
    }
  },
  created(){
    
  },
  methods:{
   
  }
};
</script>
<style lang="scss">
header {
  width: 100%;
  height: 1rem;
  text-align: center;
  background: rgb(165, 208, 248);
  span {
    display: block;
    font-size: .35rem;
    text-align: center;
    line-height: 1rem;
    border-bottom: 1px solid #ccc;
  }

}
</style>