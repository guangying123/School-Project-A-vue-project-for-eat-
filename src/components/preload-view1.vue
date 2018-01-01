<template>
  <div class="preload-view" v-if="pageLoading['show']">
    <div class="top">
      <Cell>
        <Spinner type="lines" size="40px"></Spinner>
      </Cell>
    </div>
    <p class="showInfo">加载中....</p>
  </div>
</template>

<script>

  import { Spinner, Cell } from 'Vux';
  export default {
    name: 'preload-view',
    props:["pageLoading"],
    components: {
      Spinner,
      Cell
    }
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

  .showInfo {
    text-align: center;
    font-size: 20px;
  }
  .top {
    text-align: center;
    width: 56%;
  }
</style>
