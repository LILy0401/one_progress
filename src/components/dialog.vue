<template>
  <div class="dialog_box">
    <div class="Dialog">
      <slot></slot>
    </div>
  </div>
  
</template>
<script>
export default {};
</script>
<style lang="scss">
.dialog_box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0,0,0,.6);
}
.Dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 70%;
  height: 3.8rem;
  background: #f2f3f4;
  box-shadow: 5px 5px 10px #ccc;
  &>span {
    display: block;
    height: .5rem;
    line-height:.5rem;
    text-align: center;
    margin-left: .3rem;
    font-size: .3rem;
  }
  .input {
    width: 80%;
    margin: 0 auto;
    margin-bottom: .1rem;
    input {
      width: 100%;
      padding-left: .1rem;
      height: .5rem;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
    ::-webkit-input-placeholder {
      font-size: .18rem;
    }
    textarea {
      height: 1.2rem;
      width: 100%;
      padding-left: .1rem;
      padding-top: .1rem;
      border: 1px solid #ccc;
    }
    .el-radio {
      text-align: center;
      margin-left: 15px;
    }
  }

  .btn {
    width: 100%;
    height: .45rem;
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    p {
      padding: 0 10px;
      height: .45rem;
      font-size: .17rem;
      line-height: .45rem;
      background: #eee;
      border: 1px solid #ddd;
      border-radius: 3px;
      color: #009688;
    }
    p:nth-child(2) {
      color: red;
    }
  }
}
</style>
