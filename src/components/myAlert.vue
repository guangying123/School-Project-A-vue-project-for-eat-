<template>
  <div class="myAlert" v-if="dealisShow">
    <div class="plain">
      <div class="title">{{title}}</div>
      <div class="cont">{{des}}</div>
      <input type="text" class="mytext" v-model="userID"/>
      <span v-if="showerr" class="errInfo">输入的手机号有误</span>
      <div class="switcher">
        <button @click="goback">取消</button>
        <div class="midline"></div>
        <button @click="ensure">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {setLocalStorage,getLocalStorage} from '../utils/storage'
  export default {
      data(){
        return {
            userID:'',
            showerr: false
        }
      },
      props: {
          "title": {
              type: String,
              default: ""
          },
        "des": {
          type: String,
          default: ""
        },
        "isshow":  {
          type: Boolean,
          default: false
        }
      },
    computed: {
          dealisShow() {
              return this.isshow
          }
    },
    watch:{
          userID:function (newval) {
              if(newval =="")
                  this.showerr = false
          }
    },
    methods: {
          goback() {
            this.$emit("hiddleAlert")
          },
          ensure() {
              var par = /^\d{11}$/;
              if(!par.test(this.userID)) {
                  this.showerr = true;
              }else {
                  setLocalStorage("userID",this.userID);
                  this.goback();
                  var btnindex = getLocalStorage("btnindex");
                  if(btnindex == 2) {
                    this.$router.push("/orderList/" + this.userID)
                  }else {
                    this.$router.push("/orderMain")
                  }
              }
          },
          errinfordeal() {
              console.log(this.userID)
              if(this.userID==''){
                this.showerr = false;
              }
          }
    }
  }
</script>

<style scoped>
  .myAlert {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
  }
  .plain {
    position: absolute;
    background-color: white;
    text-align: center;
    height: 8rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    flex-direction: column;
    padding-top: 1rem;
    width: 80%;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .title {

  }
  .cont {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  .mytext {
    height: 1.2rem;
    width: 9rem;
    margin-top: 0.8rem;
    border: 1px solid black;
    border-radius: 5px;
  }
  .switcher {
    display: flex;
    display: -webkit-flex;
    width: 9rem;
    margin-top: 0.6rem;
  }
  .switcher button {
    flex: 1;
    height: 1.2rem;
    border-radius: 5px;
  }
  .errInfo {
    font-size: 0.5rem;
    color: red;
    margin-top: 0.3rem;
  }
  .midline {
    width: 1rem;
  }
</style>
