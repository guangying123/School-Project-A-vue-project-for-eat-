<template>
  <div class="contentAlert">
    <div class="plain">
      <div class="title"><strong>温馨提示^_^</strong></div>
      <div class="cont">
        <p class="des">请输入你的手机号</p>
        <input v-model="userID" class="myinput"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data() {
          return {
              userID:""
          }
      },
      props:{

      }
  }
</script>

<style scoped>
  .contentAlert {
    width: 100%;
    height: 30rem;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.2);
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .plain {
    background-color: white;
    width: 10rem;
    height: 9rem;
    border-radius: 10px;
    text-align: center;
    padding-top: 0.8rem;
  }
  .title {
    color: palevioletred;
    font-size: 0.9rem;
  }
  .des {
    margin-top: 0.6rem;
    font-size: 0.8rem;
    color: deeppink;
  }
  .myinput {
    margin-top: 10px;
    height: 30px;
    border-radius: 5px;
  }

</style>
