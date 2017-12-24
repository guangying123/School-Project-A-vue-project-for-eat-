<template>
  <div class="orderList">
    <pageLoaded :pageLoading = "pageLoading"></pageLoaded>
    <div v-if="orderList.length>0" class="orderListItem" v-for="(listitem,index) in orderList" :key="index" @click="handler"  :data-sernum="listitem.seri_num">
      <p class="bianhao">订单编号:   {{listitem.seri_num}}<span class="more"></span></p>
      <p>日期：{{listitem.date}}</p>
      <div>
        <div v-for="(fitem,findex) in listitem.food" :key="index+'fcont'+findex" class="fitem">
          <p>{{fitem.name}}</p>
          <p>{{fitem.count}}</p>
        </div>
        <div class="foodstatus" :class="{fooddonecolor:listitem.flag == 2}">
          {{foodStatus(listitem)}}<span class="foodfire" v-if="listitem.flag == 1"></span><span v-else class="fooddone" ></span>
        </div>
      </div>
    </div>
    <div v-if="orderList.length==0" class="costum">暂无历史消费记录~~</div>
  </div>
</template>

<script>
  import pageLoaded from '@/components/preload-view.vue';
  export default {
    data() {
        return {
            orderList: [],
            userID:"",
            pageLoading:{
              show: true
            },
        }
    },
    components: {
      pageLoaded
    },
    mounted() {
        let self = this;
        this.userID = localStorage.getItem("userID");
        this.$http.get('../src/mock/interface.json').then(res =>{
          self.orderList = res.data.orderList;
//      self.orderList = [];
      self.pageLoading.show = false;

          console.log(self.orderList)
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
            localStorage.setItem("orderlist",sernum);
            this.$router.push("/goforPay");
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
    padding-top: 1rem;
    background-color: skyblue;
  }
  .orderListItem {
    position: relative;
    width: 90%;
    height: 8rem;
    border: 1px solid yellow;
    margin-bottom: 0.5rem;
    padding: 10px 13px;
    background-color: #fff;
  }
  .fntcolor {
    color: red;
  }
  .fitem {
    display: flex;
    display: -webkit-flex;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 2px;
    color: #A0A0A0;
    align-items: baseline;
    justify-content: space-between;
  }
  .orderListItem p:nth-of-type(1) {
    font-size: 0.9rem;
  }
  .orderListItem p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
    padding-left: 15px;
    color: #A0A0A0;
  }
  .foodstatus {
    font-size: 0.9rem;
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
  .fitem p {
    font-size: 0.8rem!important;
  }
  .more {
    width:15px ;
    height: 15px;
    border-left: 2px solid #a0a0a0;
    border-bottom: 2px solid #a0a0a0;
    display: inline-block;
    transform: rotate(-135deg);
    position: absolute;
    top: 14px;
    right: 28px;
  }
  .bianhao {
    margin-bottom: 10px
  }
  .foodfire {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../static/fire.jpg");
    background-size: 100% 100%;
    margin-left: 5px;
  }
  .fooddone {
    display: inline-block;
    width: 33px;
    height: 33px;
    background: url("../../static/fooddone.png");
    background-size: 100% 100%;
    position: relative;
    top: 6px
  }
  .costum {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #646464;
  }
  .fooddonecolor {
    color: #a0a0a0;
  }
</style>
