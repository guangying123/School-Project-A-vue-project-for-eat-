<template>
    <div class="preload-view" v-if="pageLoading['show']">
        <div class="dot">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <p class="showInfo">加载中....</p>
    </div>
</template>

<script>

  export default {
      name: 'preload-view',
      props:["pageLoading"]
  }

</script>

<style  scoped>
  .preload-view {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 9999;
  }
  .dot {
    position: relative;
    height: 100px;
    width: 100px;
    margin: 100px auto 30px;
  }
  .showInfo {
      text-align: center;
      font-size: 20px;
  }
  .dot span {
    display: inline-block;
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    animation:myload 1.04s ease infinite ;
  }
  @keyframes myload {
    from{
      transform: scale(1.2);
      opacity: 1;
    }
    to {
      transform: scale(0.3);
      opacity: 0.5;
    }
  }
  .dot span:nth-child(1) {
    top: 50%;
    left: 0;
    -webkit-animation-delay:0.13s;
  }
  .dot span:nth-child(2) {
    top: 13px;
    left: 1px;
    -webkit-animation-delay:0.26s;
  }
  .dot span:nth-child(3) {
    top: 0;
    left: 50%;
    -webkit-animation-delay:0.39s;
  }
  .dot span:nth-child(4) {
    right: 13px;
    top:  13px;
    -webkit-animation-delay:0.52s;
  }
  .dot span:nth-child(5) {
    right: 0;
    top: 50%;
    -webkit-animation-delay:0.65s;
  }
  .dot span:nth-child(6) {
    right: 13px;
    bottom: 13px;
    -webkit-animation-delay:0.78s;
  }
  .dot span:nth-child(7) {
    bottom: 0;
    left: 50%;
    -webkit-animation-delay:0.91s;
  }
  .dot span:nth-child(8) {
    left: 13px;
    bottom: 13px;
    -webkit-animation-delay:1.04s;
  }
</style>
