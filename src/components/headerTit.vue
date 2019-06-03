<template>
  <header>
    <h3>{{tit}}</h3>
  </header>
</template>
<script>
export default {
  name: "HeadTit",
  props: ["tit"]
};
</script>
<style lang="scss">
header {
  width: 100%;
  height: 46px;
  text-align: center;
  background: #fff;
  h3 {
    text-align: center;
    line-height: 45px;
    border-bottom: 1px solid #ccc;
  }
}
</style>