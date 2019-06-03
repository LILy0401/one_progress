<template>
  <div class="Dialog">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.Dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 70%;
  height: 250px;
  background: #f2f3f4;
  box-shadow: 5px 5px 10px #ccc;
  h3 {
    height: 45px;
    line-height: 45px;
    margin-left: 5px;
  }
  .input {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
    input {
      width: 100%;
      height: 30px;
      border: 1px solid #ccc;
      line-height: 30px;
      margin-bottom: 10px;
    }
    ::-webkit-input-placeholder {
      font-size: 14px;
    }
    textarea {
      height: 105px;
      width: 100%;
      border: 1px solid #ccc;
    }
    .el-radio {
      text-align: center;
      margin-left: 15px;
    }
  }

  .btn {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    p {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background: #ccc;
      border-radius: 3px;
      color: #009688;
    }
    p:nth-child(2) {
      color: red;
    }
  }
}
</style>
