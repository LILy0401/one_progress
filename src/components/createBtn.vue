<template>
  <div class="createProject" @click="showDialog">{{createBtn}}</div>
</template>
<script>
export default {
  props: ["createBtn", "flag"],
  methods: {
    showDialog() {
      this.$emit("showDialog", this.flag,this.createBtn);
    }
  }
};
</script>
<style lang="scss">
.createProject {
  width: 80px;
  height: 30px;
  padding: 0 8px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background: #1890FF;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>