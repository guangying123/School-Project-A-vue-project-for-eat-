<template>
  <div class="orderMain">
    <pageLoaded :pageLoading = "pageLoading"></pageLoaded>
    <div class="hearlb">
      <Swiper loop auto :list="lblist" dots-position="center"  :height="lbheight"></Swiper>
    </div>
      <div class="orderMainCont" @click="closecardetail">
        <!--左边点餐菜单栏-->
        <div class="orderMainmenu">
          <div v-for="(item,index) in orderMaindata" :key="'menu'+index" class="menuitem" >
            <p :data-type="index" @click="dealmenu($event)">{{item.type}}</p>
          </div>
        </div>
        <!--右边菜品展示栏-->
        <div class="orderMainShow">
          <div v-for="(item,index) in mytestcard" :key="'menshow'+index" class="menushow">
            <img :src="item.img"  class="foodimg"/>
            <div class="menshowright">
               <p class="foodname">{{item.name}}</p>
              <p class="fooddesc">{{item.desc}}</p>
              <p class="foodprice">￥：{{item.price}}</p>
              <div class="buy" @click="addtobuycar($event)"  :data-foodindex="index">
                <div class="hangshu shu" :data-foodindex="index"></div>
                <div class="hangshu hang" :data-foodindex="index"></div>
              </div>
            </div>
          </div>
          <div v-if="lazyloadflag" class="load">
            <Spinner type="ios"></Spinner>
          </div>
          <div v-else class="over">
            已经到底部了~~~
          </div>
        </div>
    </div>

    <div class="paybar"> <!--底部支付模块 -->
      <div class="cardetail" v-if="showcarde"> <!--查看订购商品-->
        <div class="cardetailbar"><span>已选</span><span @click="clearall">清空</span></div>
        <div>
          <div v-for="(item,index) in buycarcont" :key="'buycar'+index"class="cardetailitem">
            <div class="leftname">
              {{item.name}}
            </div>
            <div class="rightoper">
              <span>￥{{item.price}}</span>
              <div class="cardetailjian" :data-fid="item.id" data-switcher="0" @click="cardeal($event)">
                <div class="carhang" :data-fid="item.id" data-switcher="0" ></div>
              </div>
              <div>{{item.count}}</div>
              <div class="cardetailjia" :data-fid="item.id" data-switcher="1" @click="cardeal($event)">
                <div class="carjiahang" :data-fid="item.id" data-switcher="1" ></div>
                <div class="carjiashu" :data-fid="item.id" data-switcher="1" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="payleft">
        <div v-if="buycarcount>0" class="buycarcount">{{buycarcount}}</div>
        <img src="../../static/buycar.png" class="buycar" @click="showcardetail"/>
        <div class="mycount">总计：￥<span class="count">{{count}}</span>元</div>
      </div>
      <div class="payright" @click="goforPay">
        去支付
      </div>
    </div>
    <div v-transfer-dom>
      <Alert v-model="alertShow" title="出错啦~" button-text="确定" :content="msg"  hide-on-blur></Alert>
    </div>
  </div>
</template>


<script>
  import pageLoaded from '@/components/preload-view.vue';
  import {Alert,TransferDomDirective as TransferDom,Swiper,Spinner} from 'vux'

  export default {
    directives: {
      TransferDom
    },
      data() {
          return {
              count:0,
              pageLoading:{
                  show: false
              },
            alertShow:false,
            orderMaindata:[],
            mytestcard:[],
            mytestcardtotaldata:[],
            lblist:[],
            lbheight:'',
            menuflag: 0,
            lazyloadflag: true,
            buycarcount:0,
            buycarcont:[],
            showcarde:false,
            msg: ""
          }
      },
    components:{
      pageLoaded,
      Alert,
      Swiper,
      Spinner
    },
    methods: {
      goforPay() {
          console.log('goForPay')
        if(this.buycarcont.length == 0) {
          this.alertShow = true;
          this.msg = "请先选择商品";
          return;
        }
        this.$router.push('/goforPay');
      },
      setcarfoodinLocalStorage() {  //设置购物车里面的东西到localStorage
        if(this.buycarcont.length > 0) {
          var buyfood = "";
          let self = this;
          this.buycarcont.forEach(val => {
            let pinjie ="id="+val.id+"&"+"name="+val.name+"&"+"price="+val.price+"&"+"count="+val.count+"#";
            buyfood+=pinjie;
          })
          buyfood = buyfood.slice(0,buyfood.length-1);
          localStorage.setItem('carfood',buyfood);
          localStorage.setItem("buycarcount",self.buycarcount);
        }else {
            localStorage.removeItem("carfood");
            localStorage.removeItem("buycarcount");
        }
      }  ,
      cardeal(e) { // 0代表减  1代表加
        let self = this;
          let evedata = e.target.dataset;
          let fdid = evedata.fid;
          let sw = evedata.switcher;
          let delinex = -1;
        this.buycarcont = this.buycarcont.map((val,index) => {
            if(val.id == fdid) {
                if(sw == 1){
                    val.count++;
                   self.buycarcount++;
                   self.count += Number(val.price);
                }else{
                    val.count--;
                    self.buycarcount--;
                    self.count-= Number(val.price);
                    if(val.count == 0) {
                      delinex = index;
                    }
                }
            }
            return val;
          });
        if(delinex > -1) {
          this.buycarcont.splice(delinex,1);
        }
        self.setcarfoodinLocalStorage();
      },
      clearall() { // 清空购物车 并且要清localStorage
        this.buycarcont = [];
        this.buycarcount = 0;
        this.count = 0;
        localStorage.removeItem("carfood");
        localStorage.removeItem("buycarcount");
      },
      closecardetail() {
        this.showcarde = false;
        document.querySelector(".orderMainCont").style.opacity = 1;
      },
      showcardetail() {
          this.showcarde = !this.showcarde;
          if(this.showcarde) {
              document.querySelector(".orderMainCont").style.opacity = 0.6;
          }else{
            document.querySelector(".orderMainCont").style.opacity = 1;
          }
      },
       getbuycarfromStorage() {
           let self = this;
         var buycarf = localStorage.getItem('carfood');
         var buycarcounttem = localStorage.getItem("buycarcount");
         if(buycarcounttem>0) {
             this.buycarcount = buycarcounttem;
         }
         if(buycarf) {
          var buycarfsplit = buycarf.split("#");
           this.buycarcont = buycarfsplit.map(val => {
               let temval = val.split("&");
               let temresu = {};
                temval.map(val => {
                    let t = val.split("=");
                    temresu[t[0]] = t[1];
                    return ;
                })
             self.count+= temresu["count"]*temresu["price"];
             return temresu;
           })
         }
       },
      addtobuycar(e) {
          var foodindex = e.target.dataset.foodindex;
          let addfood = this.orderMaindata[this.menuflag].detail[foodindex];
          this.count+= addfood.price;
          let flag = false;
          this.buycarcont = this.buycarcont.map(val => {
              if(val.id == addfood.id) {
                  flag = true;
                  val.count++;
              }
              return val;
          });
          if(!flag) {
            let {id,price,name,count=1} = addfood;
            this.buycarcont = [{id,price,name,count},...this.buycarcont]
          }
          this.buycarcount++;
      },
      lazyload() {  // 为提高优化，前端做分批处理，即对菜品这一块，每次仅渲染个菜品，实现下滑获取更多
        var orderMainShow =  document.querySelector('.orderMainShow');
        var showheight = 18*(document.documentElement.clientWidth/320)*20;
        var self = this;
        orderMainShow.onscroll = function () {
            if(orderMainShow.scrollTop + showheight >= orderMainShow.scrollHeight - 2) {
              if(self.mytestcardtotaldata.length > 0) {
                setTimeout(function () {
                  self.mytestcard = [...self.mytestcard,...self.mytestcardtotaldata.slice(0,10)];
                  self.mytestcardtotaldata = [...self.mytestcardtotaldata.slice(10)];
                },500,false)
              }else {
                  self.lazyloadflag = false;
              }
            }
        }
      },
      dealmenu(e) {     // 处理点击左边点餐栏获得点餐栏数据的索引。
          this.lazyloadflag = true;
          let activedindex = Number(this.menuflag)+1;
          document.querySelector('.orderMainmenu div:nth-of-type('+activedindex+')').style.backgroundColor = '#f8f8f8' ;
          let menuid = e.target.dataset.type;
          this.menuflag = menuid||0;
          this.mytestcardtotaldata = this.orderMaindata[this.menuflag].detail.slice(10);
          this.mytestcard = this.orderMaindata[this.menuflag].detail.slice(0,10);
        if(this.mytestcardtotaldata.length == 0) {
          this.lazyloadflag = false;
        }
          let activeindex = Number(this.menuflag)+1;
          let test =  document.querySelector('.orderMainmenu div:nth-of-type('+activeindex+')');
          test.style.backgroundColor = '#ffffff';
      }
    },
    mounted() {
        let self = this;
        this.pageLoading.show = true;
        self.lbheight = (document.documentElement.clientHeight - 21.2*((document.documentElement.clientWidth/320)*20))+'px'; //设置轮播图的尺寸
      this.$http.get('src/mock/interface.json').then(res => {
          self.orderMaindata = res.data.orderMain || [];
          self.pageLoading.show = false;
          self.mytestcardtotaldata = self.orderMaindata[0].detail.slice(10);
          self.mytestcard = self.orderMaindata[0].detail.slice(0,10);
          if(self.mytestcardtotaldata.length == 0) {
              self.lazyloadflag = false;
          }
          self.lblist  = res.data.lblist;
          self.lazyload();
          self.getbuycarfromStorage();
      }).catch(err => {
          self.alertShow = true;
          self.msg = "数据拉取失败";
          console.log(err);
      })
    },
    beforeDestroy() {
        this.setcarfoodinLocalStorage();
    }
  }

</script>

<style scoped>
  .hangshu  {
    position: absolute;
    background-color: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .hearlb {
    position: fixed;
    bottom: 21.2rem;
    width: 100%;
    border-bottom: 2px solid pink;
  }
  .shu {
    height: 0.7rem;
    width: 2px;
  }
  .hang {
    width: 0.7rem;
    height: 2px;
  }
  .orderMain {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .foodimg {
    width: 3rem;
  }
  .orderMainShow {
    flex: 1;
    min-height: 18rem;
    max-height: 18rem;
    overflow-y: auto;
    padding: 0 5px;
  }
  .orderMainCont {
    display: flex;
    display: -webkit-flex;
    position: fixed;
    bottom: 3rem;
    width: 100%;
  }
  .orderMainmenu {
    width: 3.5rem;
    min-height: 18rem;
    max-height: 18rem;
    overflow-y: auto;
  }
  .orderMainmenu div:nth-of-type(1) {
    background-color: #fff;
  }
  .menushow {
    display: flex;
    display: -webkit-flex;
    height: 3rem;
    margin-top: 1rem;
    position: relative;
    border: 1px solid #A0A0A0
  }
  .over {
    color:#999;
    font-size: 0.7rem;
    text-align: center;
    padding-top:2px;
    padding-bottom: 2px;
  }
  .load {
    text-align: center;
  }
  .buycarcount {
    border-radius: 50%;
    background-color: #ff7416;
    width: 0.7rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    font-size: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    left: 2rem;
    top: 0.2rem;
  }
  .buy {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: #2395ff;
    border-radius: 50%;
    right: 0.5rem;
    bottom: 0.2rem;
  }
  .cardetail {
    position: fixed;
    min-height: 2rem;
    width: 100%;
    border: 1px solid yellow;
    bottom: 3rem;
    padding: 10px 15px;
    z-index:999;
    background-color: #ffffff;
  }
  .cardetailbar {
    position: relative;
    margin-bottom: 12px;
  }
  .cardetailbar span:nth-of-type(1) {
    color: #666;
    font-size: 0.6rem;
  }
  .cardetailbar span:nth-of-type(2) {
    position: absolute;
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    width: 1.1rem;
    height: 1.1rem;
    white-space: nowrap;
    line-height: 1.1rem;
    text-align: center;
    right: 1.38rem;
  }
  .menshowright {
    overflow: hidden;
    padding: 0 10px;

  }
  .menshowright p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .foodname {
    font-size: 0.8rem;
  }
  .fooddesc {
    font-size: 0.5rem;
    color: #999;
  }
  .foodprice {
    font-size: 0.8rem;
    color: #f60;
  }
  .paybar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    background-color: rgba(0,0,0,0.6);
    font-size: 0.8rem;
    overflow: hidden;
    z-index: 999;
  }
  .payleft {
    flex:1;
    color: #ffffff;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  .payright {
    width: 4rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #ffffff;
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #fff;
  }
  .menuitem {
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    color: #666;
    background-color: #f8f8f8;
    border-bottom: 1px solid #646464;;
    font-size: 0.8rem;
  }
  .mycount {
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 8rem;
  }
  .cardetailitem {
    display: flex;
    display: -webkit-flex;
    margin: 5px 0;
  }
  .count {
    color: deepskyblue;
  }
  .buycar {
    width: 2.5rem;
    border-radius: 50%;
    margin-left: 5px;
  }
  .leftname {
    color: #333;
    font-size: 0.7rem;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rightoper {
    display: flex;
    display: -webkit-flex;
    width: 6rem;
    position: relative;
    align-items: center;
  }
  .cardetailjian {
    position: relative;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: 1px solid #2395ff;
    margin: 0 0.28rem;
  }
  .cardetailjia {
    position: relative;
    width: 0.7rem;
    height: 0.7rem;
    border: 1px solid #2395ff;
    border-radius: 50%;
    background-color: #2395ff;
    margin-left: 0.28rem;
  }
  .carjiahang {
    width: 0.5rem;
    height: 1px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .carjiashu {
    height: 0.5rem;
    width: 1px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .rightoper span {
    color: #f60;
    font-size: 0.7rem;
  }
  .carhang {
    width: 0.5rem;
    height: 1px;
    background-color: #2395ff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

</style>
