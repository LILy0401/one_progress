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
@import url("./scss/common.scss");
*{
  margin: 0 auto;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
body,html{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
</style>
