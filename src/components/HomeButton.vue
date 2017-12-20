<template>
  <div class="containr" :style="{'background-color': bgcolor}"  @click="handler">
    {{name}}
  </div>
</template>

<script>
  export default {
      props: ['name','bgcolor','funname'],
      methods: {
        handler() {
            this.$emit(this.funname)
        }
      }
  }
</script>

<style scoped>
  .containr {
    width: 60%;
    height: 3rem;
    line-height: 3rem;
    background-color: yellow;
    border-radius: 5%;
    text-align: center;
    animation: shine 3s ease 0s infinite ;
    -webkit-animation: shine 4s ease 0s infinite ;
  }
  @keyframes shine {
    0% {
      transform: scale(1.0)
    }
    25% {
      transform: scale(1.1) rotate(3deg);
    }
    50% {
      transform: scale(1.0) rotate(0deg);
     }
    75% {
      transform: scale(1.1)  rotate(-3deg);
    }
    100% {
      transform: scale(1.0)
    }
  }
</style>
