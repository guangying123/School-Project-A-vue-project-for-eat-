<template>
  <div id="orderDetail">
    <p>订单详情</p>
  </div>
</template>

<script>
  export default {
      mounted() {
          var sernum = this.$route.params.sernum;  //订单编号
          console.log(sernum)
      }
  }

</script>

<style>


</style>
