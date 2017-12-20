<template>
  <div class="orderList">
    <div class="orderListItem" v-for="(listitem,index) in orderList" :key="index" @click="handler"  :data-sernum="listitem.seri_num">
      <p>订单编号:   {{listitem.seri_num}}</p>
      <p>日期：{{listitem.date}}<span :class="{fntcolor:listitem.flag == 1}" >{{foodStatus(listitem)}}</span><span v-if="listitem.flag==1"></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            orderList: []
        }
    },
    mounted() {
        console.log(this.$route.params.userID) //此处拿到对应的额UuserID
        this.$http.get('../src/mock/interface.json').then(res =>{
            this.orderList = res.data.orderList;
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        foodStatus(dat) {
            switch (dat.flag) {
              case '1': return "制作中";
              case '2': return "已完成";
              default: return "";
            }
        },
      handler(e) {
            var sernum = e.currentTarget.dataset.sernum;
            this.$router.push("/orderDetail/"+sernum);
      }
    }
  }
</script>

<style scoped>
  .orderList {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding-top: 2rem;

  }
  .orderListItem {
    margin-top: 0.8rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-around;
    border: 0.1rem solid deeppink;
    border-radius: 5px;
    height: 4rem;
    padding-left: 0.8rem;
  }
  .orderListItem p:nth-of-type(1) {
    font-size: 0.8rem;
  }
  .orderListItem p:nth-of-type(2) {
    font-size: 0.6rem;
  }
  .orderListItem p span {
    display: inline-block;
    margin-left: 0.4rem;
  }
  .orderListItem p span:nth-of-type(2) {
    border: 1px dotted red;
    width: 10px;
    margin-bottom: 3px;
    margin-left: 0;
  }
  .fntcolor {
    color: red;
  }
</style>
