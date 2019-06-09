<template>
  <div id="app">
      <router-view />
  </div>
</template>
<script>

export default {
  data() {
    return {}
  },
  components: {
   
  },
  methods: {
   
  }
};
</script>
<style lang="scss">
*{
  margin: 0 auto;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
}
body,html{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
  .inp_err{
    border: 1px solid red;
  }
}

</style>
