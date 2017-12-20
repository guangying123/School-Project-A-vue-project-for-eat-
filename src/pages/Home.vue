<template>
  <div class="contain">
    <pageLoaded :pageLoading="pageLoading"></pageLoaded>
    <div class="menu">
      <p class="great" ref="great"><span class="laba"></span><span class="kuang"><span class="greatcont" ref="greatcont">{{great}}</span></span></p>
      <HomeButton name="我要点餐" bgcolor="yellow" funname="order"  @order="order"></HomeButton>
      <div class="separ"></div>
      <HomeButton name="已点订单" bgcolor="skyblue" funname="finished"  @finished="finished" id="main"></HomeButton>
    </div>
    <myAlert title="温馨提示~" des="请输入你的手机号"  :isshow="isshow" @hiddleAlert="hiddleAlert">
    </myAlert>
    <div v-transfer-dom>
      <Alert v-model="alertShow" title="出错啦~" button-text="确定" content="数据拉取失败"  hide-on-blur></Alert>
    </div>
  </div>
</template>

<script>
  import HomeButton from '@/components/HomeButton.vue'
  import {getLocalStorage, setLocalStorage} from '../utils/storage'
  import myAlert from "@/components/myAlert.vue"
  import pageLoaded from '@/components/preload-view.vue'
  import {Alert,TransferDomDirective as TransferDom} from 'vux'

  export default {
    directives: {
      TransferDom
    },
      data() {
          return {
            great:'',
            isshow:false,
            userID:'',
            pageLoading: {
                show: true
            },
            alertShow:false,
            timer:''
          }
      },
      mounted() {
        let self = this;
          this.$http.get('src/mock/interface.json').then(res => {
            self.great = res.data.Home.great;
            self.pageLoading["show"] = false;
            self.dealanno(); //  处理喇叭提示字超长
          }).catch(err =>{
            self.alertShow = true
              console.log(err)

          })
      },
    beforeDestroy() {
      clearInterval(this.timer);
    },
      components: {
          HomeButton,
          myAlert,
          pageLoaded,
          Alert
      },
    methods: {
      dealanno() {
        let self = this;
        let great = this.$refs.great;
        let kuang = great.clientWidth - 40;
        let greatWidth = 0.75*(document.documentElement.clientWidth/320)*20*(this.great.length);
        let dert = greatWidth - kuang;
        if(dert >= 5) {
            self.timer = setInterval(function () {
              document.querySelector('.greatcont').style.transition = "left 3s linear 0s";
              document.querySelector('.greatcont').style.left = -dert +'px';
              setTimeout(function () {
                document.querySelector('.greatcont').style.transition = "";
                document.querySelector('.greatcont').style.left = 0 + 'px';
              },2000,false);
            },3500,false)
        }
      },
      finished() {
          setLocalStorage("btnindex",2)
          this.isshow = this.getIshow();
          if(!this.isshow) {
              this.$router.push("/orderList/" + this.userID)
          }
      },
      order() {
        console.log(this.userID)
        this.isshow = this.getIshow();
        setLocalStorage("btnindex",1)
        if(!this.isshow) {
          this.$router.push("/orderMain");
        }
      },
      getIshow() {
          this.userID = getLocalStorage("userID");
          return !this.userID
      },
      hiddleAlert() {
          this.isshow = false;
      }
    }
  }
</script>

<style scoped>
  .test {
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .contain {
    overflow: hidden;
    width: 100%;
    height: 28rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background:  url("../../static/bgHome.jpg") no-repeat;
    background-size: 30% 15%;
  }
  .menu {
    width: 80%;
    border: 1px dashed gray;
    height: 20rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFCC;
    border-left: 3px solid #C0C0C0;
    margin-top: 1rem;
    overflow: hidden;
  }
  .great {
    font-size: 0.8rem;
    color: 	#C0C0C0;
    margin-top: 2rem;
    margin-bottom: 2.6rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    width: 80%;
  }
  .laba {
    background: url("../../static/laba.jpg");
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: cover;
    transform: rotate(-160deg);
    margin-right: 10px;
    animation: labarotate 1.5s ease 1s infinite;
  }
  .separ {
    width: 100%;
    height: 2rem;
  }
  .greatcont {
    display: inline-block;
    position: relative;
    left: 0;
    top: 0;
  }
  .kuang {
    display: inline-block;
    overflow: hidden;
  }
  @keyframes labarotate {
    0% {
      transform: rotate(-160deg) scale(1);
    }
    25% {
      transform: rotate(-140deg) scale(1.1);

    }
    50% {
      transform: rotate(-160deg) scale(1);
    }
    75% {
      transform: rotate(-160deg);
    }
    100% {
      transform: rotate(-160deg);
    }
  }
</style>
