<template>
  <div class="orderItem">
    <img :src="fooditem.img" class="left"/>
    <div class="middle">
      <p>{{fooditem.name}}</p>
      <p>￥{{fooditem.price}}</p>
    </div>
    <div class="separ"></div>
    <div v-if="fooditem.flag==1" class="right making">
      制作中
    </div>
    <div v-if="fooditem.flag==2" class="right">
      已完成
    </div>
  </div>
</template>

<script>
  export default {
      props: {
          "fooditem":{
              type: Object,
              required: true,
              validator: function (value) {
                  let reqProps = ["img","name","price","flag"];
                  reqProps.forEach(item => {
                    if(!(item in value)) {
                        console.log("fooditem 缺少属性："+item);
                        return false;
                    }
                  })
                return true;
              }
          }
      }
  }

</script>

<style scoped>
  .text {
    height: 10rem;
  }
  .orderItem {
    width: 80%;
    height: 4rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid darkcyan;
    font-size: 0.8rem;
    border-radius: 0.5rem;
  }
  .left {
    width: 5rem;
    height: 4rem;
    border-radius: 0.6rem;
  }
  .middle {
    height: 100%;
    flex: 1;
    margin-left: 0.6rem;

  }
  .middle p:nth-of-type(1) {
    margin-top: 0.5rem;
  }
  .middle p:nth-of-type(2) {
    margin-top: 0.4rem;
  }
  .right {
    width: 1rem;
    height: 100%;
    padding-top: 0.6rem;
    margin-right: 0.6rem;
    font-size: 0.6rem;
  }
  .separ {
    width: 0;
    height: 100%;
    margin-right: 0.5rem;
    border: 0.06rem dotted darkcyan;
  }
  .making {
    background: url("../../static/fire.jpg") no-repeat;
    background-position: 5% 80%;
    background-size: 15px 20px;
  }
</style>
