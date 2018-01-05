<template>
  <div class="cardCenter">
    <div class="carbar">
      <tab v-model="index">
        <tab-item class="vux-center" :selected="barflag==index" v-for="(item,index) in  bartype"  @click="barflag=index" :key="index">{{item}}</tab-item>
      </tab>
      <div  class="myswiper" >
        <div v-for="(item, index1) in cardCenter" :key="index1"  v-show="mymap[index1] == bartype[index] ">
          <div class="tab-swiper vux-center" v-if="item.length > 0">
            <!--所有卡券的样式 -->
            <div v-for="(titem,tindex) in item" :key="'t'+tindex" class="carditem"  :data-seri="titem.seri" :data-index="index1" :data-cardindex="tindex" @click="handler($event)">
              <div class="carditemmain">
                <div class="carcircle" :class="{used:index1==='used'}"></div>
                <div class="cardprice" ><span  >{{titem.value}}</span>元代金券</div>
                <div class="carddes"  >满{{titem.uselimit}}元可用</div>
                <div v-if="index1==='used'" class="willuse used"><span class="getnow">已使用</span></div>
                <div v-if="index1=='willuse'" class="willuse"><span class="getnow">立即领取</span></div>
                <div v-if="index1=='canuse'" class="willuse" ><span class="getnow">可使用</span></div>
              </div>
          </div>
        </div>
          <div v-else class="nocard">
            <span>暂无卡券~~</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Tab, TabItem,Swiper,SwiperItem} from 'vux'
  export default {
      data() {
          return {
              index:0,
              barflag:0,
              cardCenter: {
                willuse:[],
                canuse:[],
                used:[],
              },
             bartype:[
                 "待领取",
                 "待使用",
                "已使用"
        ],
            mymap: {
                  "willuse":"待领取",
                  "used":"已使用",
                  "canuse":"待使用"
            }
          }
      },
    watch: {
      index: function (val) {
        console.log(val)
      }
    },
    methods: {
      handler(e) {
          let dataset = e.currentTarget.dataset;
          let self = this;
          console.log(dataset)
        if(dataset.index == 'willuse') {
            let seri= dataset.seri; // 卡券种类
            let cardinex = dataset.cardindex;

          //像领取卡券接口发送用户userID信息和卡券id  需谈框显示领取成功
          this.$http.post(this.$store.state.baseUrl+'/receivecard',{
              seri: seri,
              userId: localStorage.getItem('userID')
          }).then(res=>{
              console.log(res);
              if(res.data.error == 0) {
                let temp = {};
                temp = self.cardCenter. willuse.splice(cardinex,1);
                self.cardCenter. canuse =  [...temp,...self.cardCenter. canuse];
                alert('卡券领取成功')
              }else {
                alert(res.data.errmsg);
              }
          }).catch(err =>{
              alert('卡券领取失败');
          });
        }
      }
    },
    mounted() {
          //请求卡券接口
      let userID = localStorage.getItem('userID');
      let self = this;
      this.$http.get(this.$store.state.baseUrl+'/will_useing_used_card?userId='+userID).then(res => {
          let mydata = res.data;
          if(mydata.error == 0){
              self.cardCenter .willuse = mydata.willuse ||[];
              self.cardCenter.canuse = mydata.canuse || [];
              self.cardCenter.used = mydata.used || [];
          }else {
              alert(mydata.errmsg);
          }
      }).catch(err => {
          alert('数据加载失败')
      })
    },
    components: {
          Tab,
          TabItem,
          Swiper,
          SwiperItem
    }
  }
</script>

<style  scoped>
  .carditem {
    padding-left: 15px;
    padding-right: 15px;
  }
  .carditemmain {
    height: 3.5rem;
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
    height: 4rem;
    border-radius: 50%;
    left: -1rem;
    top: -0.3rem;
  }
  .cardprice {
    font-size: 0.4rem;
    color: lightskyblue;
    margin-top: 10px;
  }
  .cardprice span {
    font-size: 1.2rem;
    margin-right: 2px;
  }
  .carddes {
    font-size: 0.4rem;
    color: #A0A0A0;
    margin-left: 8px;
    margin-top: 5px;
  }
  .cardcount .carditem:last-child {
    margin-bottom: 10px;
  }
  .myswiper {
    min-height: 5rem;
  }
  .canuse {
    color:#000000;
  }
  .willuse {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.7rem;
    width: 57px;
    background-color: lightblue;
    height: 100%;
    text-align: center;
  }
  .getnow {
    writing-mode: tb;
    line-height: 100%;
    height: 100%;
    letter-spacing: 2px;
  }
  .used{
    background-color: #a0a0a0;
    color: #fff;
  }
  .nocard {
    text-align: center;
    font-size: 0.9rem;
    padding: 10px;
    font-size: 0.8rem;
  }
</style>
