<template>
  <div class="goforPay">
    <pageLoaded :pageLoading = "pageLoading"></pageLoaded>
    <div class="goforPaymain">
      <div class="title">
        {{showtitle()}}
      </div>
      <div class="fooddetail">
        <div v-for="(item,index) in buycarcont" :key="index" class="fooddetailitem">
          <p class="name">{{item.name}}</p>
          <div class="left">
            <span class="price">￥{{item.price}}</span>
            <span class="separ"></span>
            <span><span class="fdcount">{{item.count}}</span>个</span>
          </div>
        </div>
      </div>
      <div class="eattype">
        <div class="instore" @click="eattype=1"><span :class="{checked:eattype == 1}" @click="eattype=1"></span>食堂</div>
        <div class="outstore" @click="eattype=2"><span :class="{checked:eattype == 2}" @click="eattype=2"></span>外卖</div>
      </div>
      <div class="card" v-if="!orderlist">
        <div class="cardtitle" @click="chosecard">
          <span>优惠券</span>
          <span class="arrow" v-if=" cardInfo.length >0" :class="{arrowUpclass:arrowUp}"></span><span v-else class="nocard">暂无可用券</span>
        </div>
        <div class="cardcount" v-if="cardInfo.length >0 &arrowUp">
          <div class="carditem" v-for="(item,index) in cardInfo" :key="'card'+index" :data-index="index" :data-price="item.value"  @click.stop ="chosecarditem($event)">
            <div class="carditemmain">
              <div class="carcircle"></div>
              <div class="cardprice"  ><span  >{{item.value}}</span>元代金券</div>
              <div class="carddes"  >满{{item.limit}}元可用</div>
              <div class="cardcheck"  :class="'card'+index"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="orderlist & cardlimit" class="ordercard">
        <div class="carditemmain">
          <div class="carcircle" style="background-color: #A0A0A0"></div>
          <div class="cardprice"  ><span  >{{card}}</span>元代金券</div>
          <div class="carddes"  >满{{cardlimit}}元可用</div>
          <div class="used">已使用</div>
        </div>
      </div>

      <div class="countsum">
        共:<span>{{count}}</span>元<span>（实际支付{{count-card}}）</span>
      </div>
      <div class="ensure" @click="forPay" v-if="!orderlist">
        确认支付
      </div>
    </div>
  </div>
</template>

<script>
  import pageLoaded from '@/components/preload-view.vue';
  import {Selector,Group} from 'vux';
  export default {
      data() {
          return {
            pageLoading:{
              show: false
            },
            buycarcont:[],
            count:0,
            eattype:1, //1代表店里就餐，2代表外卖
            card:0,
            cardindex:-1,
            arrowUp:false, // true为展开模式，fase为收起模式
            cardInfo:[],
            userID:'',
            orderlist:'',
            cardlimit:0,
          }
      },
    methods: {
          showtitle() {
            return this.orderlist ?   "订单详情：":"请再次确认您的订单：";
          },
      forPay() { //确认支付接口
        let a = {};
        if(this.cardindex != -1) {   // 后端根据有没有cardId来判断前端是否使用了优惠券
            a = {...this.cardInfo[this.cardindex]};
        }
       a.userID = this.userID;
       a.count = this.count;
       a.food = this.buycarcont;
       a.eattype = this.eattype;
       console.log(a);  // 需要调用支付接口，传递参数为a  后端需要生成订单编号来记录这次交易

      },
      chosecarditem(e) {
          let {index,price} = e.currentTarget.dataset;
          this.card = price;
          if(this.cardindex != -1)
          document.querySelector('.card'+this.cardindex).style.background="#fff";
          this.cardindex = Number(index) ;
        document.querySelector('.card'+this.cardindex).style.background="yellow";
      },
      chosecard() {
          if(this.cardInfo.length >0) {
              this.arrowUp = !this.arrowUp;
          }
      }
    },
    mounted() {
      this.pageLoading.show = true;
      let self = this;
      this.orderlist = localStorage.getItem('orderlist');
      if(this.orderlist) {   //根据订单编号请求订单详情接口

        this.$http.get('src/mock/interface.json').then(res => {
          self.pageLoading["show"] = false;
          let orderlist = res.data.findbyordernum;
          self.count = orderlist.count;
          self.eattype = orderlist.eattype;
          self.buycarcont = orderlist.food;
          if(orderlist.limit) {  //代表本次交易使用了优惠券
              self.card = orderlist.value;
              self. cardlimit = orderlist.limit;
          }
        }).catch(err => {
          self.alertShow = true
          console.log(err)
        })
      }else {
        let carfd = localStorage.getItem("carfood");
        if (carfd) {
          var buycarfsplit = carfd.split("#");
          self.buycarcont = buycarfsplit.map(val => {
            let temval = val.split("&");
            let temresu = {};
            temval.map(val => {
              let t = val.split("=");
              temresu[t[0]] = t[1];
              return;
            })
            self.count += temresu["count"] * temresu["price"];
            return temresu;
          })
        }
        ;
        this.userID = localStorage.getItem("userID");
        this.$http.get('src/mock/interface.json').then(res => {
          self.pageLoading["show"] = false;
          //处理掉不可用的卡券
          let temcardInfo = res.data.youhuiCard;
          self.cardInfo = temcardInfo.filter(val => {
            return self.count >= val.limit;
          });
          console.log(self.cardInfo);

        }).catch(err => {
          self.alertShow = true
          console.log(err)

        })
        console.log(this.buycarcont);
      }
    },
    beforeDestroy() {
          localStorage.removeItem('orderlist');
    },
    components: {
      pageLoaded,
      Selector,
      Group
    }
  }
</script>

<style scoped>
  .goforPay {
    padding: 20px 15px;
    background-color: skyblue;
  }
  .goforPaymain {
    position: relative;
    border: 1px solid yellow;
    min-height: 8rem;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 2.5rem;
    background-color: #fff;
  }
  .ensure {
    position: absolute;
    bottom: 1rem;
    text-align: center;
    width: 90%;
    background-color: #2395ff;
    color: #fff;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
  .title {
    color: #646464;
    font-size: 0.9rem;
  }
  .fooddetailitem {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    padding: 5px 0px;
    font-size: 0.8rem;
    align-items: center;
    justify-content: center;
    color: #A0A0A0
  }
  .name {
    flex: 1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .left {
    width: 5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }
  .left .price {
    color: #f60;
    margin-right: 5px;

  }
  .left span:nth-of-type(2) {

  }
  .fdcount {
    color: #2395ff;
    margin-right: 3px;
  }
  .fooddetail {
    padding: 10px 6px;
  }
  .separ {
    width: 1px;
    height: 0.6rem;
    background-color: #646464;
    margin: 0 5px;
  }
  .countsum {
    padding-left: 15px;
    color: #646464;
    font-size: 0.9rem;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .countsum span {
    color: #2395ff;
    margin: 0 5px;
  }
  .countsum span:nth-of-type(2) {
    font-size: 0.7rem;
  }
  .eattype {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    font-size: 0.8rem;
    color: #A0A0A0;
    justify-content: space-around;
  }
  .instore span,.outstore span{
    width: 10px;
    height: 10px;
    border: 1px solid yellow;
    display: inline-block;
    margin-right: 7px;
  }
  .checked {
    background-color: yellow;
  }
  .card {
    border: 1px solid #A0A0A0;
    margin: 28px 0;
    border-radius: 5px;
  }
  .cardtitle {
    font-size: 0.8rem;
    color: #A0A0A0;
    padding: 10px 6px;
    position: relative;
  }
  .arrow {
    width: 12px;
    height: 12px;
    position: absolute;
    border-bottom: 3px solid #A0A0A0;
    border-left: 2px solid #A0A0A0;
    transform: rotate(-135deg);
    right: 0.7rem;
    top: 0.7rem;
  }
  .arrowUpclass {
    transform: rotate(-45deg);
    top: 0.5rem;
  }
  .nocard {
    font-size: 0.7rem;
    color: #A0A080;
    position: absolute;
    right: 0.7rem;
  }
  .carditem {
    width: 97%;
    margin: 0 auto;
  }
  .carditemmain {
    height: 2.5rem;
    border:1px solid yellow;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
    padding-left: 3rem;
  }
  .carcircle {
    position: absolute;
    background-color: lightskyblue;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    left: -1rem;
    top: -0.3rem;
  }
  .cardprice {
    font-size: 0.4rem;
    color: lightskyblue;
  }
  .cardprice span {
    font-size: 1.2rem;
    margin-right: 2px;
  }
  .cardcount {
    padding: 0 5px;
  }
  .carddes {
    font-size: 0.4rem;
    color: #A0A0A0;
  }
  .cardcount .carditem:last-child {
    margin-bottom: 10px;
  }
  .cardcheck {
    width: 10px;
    height: 10px;
    border: 1px solid yellow;
    position: absolute;
    right: 1rem;
    top: 1rem;
    border-radius: 50%;
  }
  .used {
    width: 40px;
    height: 10px;
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 0.4rem;
    color: #A0A0A0;
  }
  .ordercard {
    margin-top: 20px;
  }
</style>
