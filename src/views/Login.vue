<template>
  <div class="login1">
    <div class="login1_tit">
      <van-icon name="arrow-left" @click="back"/>
      <span>新会员注册</span>
    </div>
    <div class="log_list">
      <ul>
        <li class="log_item">
          <span>手机号:</span>
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="number"
            @blur="test"
          />
          <van-popup v-model="show" closeable>请输入正确的手机号</van-popup>
        </li>
        <li class="log_item">
          <span>验证码:</span>
          <input type="text" placeholder="请输入图片验证码" v-model="code" />
          <Code></Code>
          <van-popup v-model="cose" closeable>请输入正确的图片验证码</van-popup>
        </li>
        <li class="log_item">
          <span>密&emsp;码:</span>
          <input type="text" placeholder="请输入密码" v-model="psw" />
        </li>
      </ul>
      <p class="quan">注册即可获得20元优惠券</p>
      <span class="go_login" @click="setup">注册</span>
      <van-popup v-model="reply" closeable>该手机号已被注册！</van-popup>
      <van-popup v-model="yes" closeable>注册成功！请登录</van-popup>
      <div class="go_sign">
        <router-link to="/sign/phone">已有账号，马上去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      number: "",
      psw: "",
      code: "",
      num_bool: false,
      show: false,
      cose:false,
      cose_bool:false,
      yes:false,
      reply:false,
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    test() {
      if (this.number.length > 0) {
        var reg = /^1[34578]\d{9}$/;
        var bool = reg.test(this.number);
        if (!bool) {
          this.show = true;
        }else{
          this.num_bool=true;
          this.show = false;
        }
      }
    },
    setup(){
      if(this.code != this.$store.state.code){
        this.cose = true;
      }else{
        this.cose_bool = true;
      }
      if(this.cose_bool == true && this.num_bool==true && this.psw!=''){
        this.axios.get(`http://localhost:3000/selects?tel='${this.number}'`).then(res=>{
          console.log(res.data.data);
          console.log(res.data.data.length==0);
          // 为空，说明没注册，开始请求注册
          // 不为空，说明被注册，提示被注册了
          if(res.data.data.length>0){
            this.reply = true;
            this.code = '';
            this.psw='';
            return;
          }else if(res.data.data.length==0){
            this.axios.get(`http://localhost:3000/login?tel=${this.number}&pwd=${this.psw}`).then(res=>{
              this.yes=true;
              this.code = '';
              this.psw='';
            }).catch(err=>{
              console.log(err);
            })
          }
        }).catch(err=>{
          console.log(err);
        })
        
      }
    },
    random() {
      //产生随机数
      let str = "";
      for (let i = 0; i < 4; i++) {
        str += parseInt(Math.random() * 10);
      }
      return str;
    },
  },
};
</script>

<style scoped>
.log_list {
  font-size: 0.12rem;
  color: rgb(60, 35, 20);
  letter-spacing: 0.0075rem;
}
.log_item {
  border-bottom: 1px solid #e7e7e7;
  height: 0.48rem;
  line-height: 0.48rem;
  padding-left: 0.08rem;
  padding-right: 0.08rem;
  overflow: hidden;
}
.log_item span {
  display: inline-block;
  width: 0.68rem;
}
.log_item input {
  border: none;
  display: inline-block;
  height: 100%;
  line-height: 100%;
}
.qr {
  float: right;
  height: 0.24rem;
  line-height: 0.24rem;
  border: 1px solid #3c2314;
  margin-top: 0.12rem;
  font-size: 0.16rem;
  text-align: center;
}
.go_login {
  display: block;
  text-align: center;
  width: 3.3rem;
  height: 0.35rem;
  line-height: 0.35rem;
  background-color: #3c2314;
  color: #fbf5dd;
  font-size: 0.14rem;
  margin: 0.35rem auto 0.3rem auto;
}
.go_sign {
  font-size: 0.12rem;
  letter-spacing: 0.0075rem;
  text-align: center;
}
.go_sign a {
  color: #3c2314;
}
.login1_tit {
  background: #fff;
  height: 0.48rem;
  line-height: 0.48rem;
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  text-align: center;
  font-size: 0.14rem;
}
.quan {
  padding-left: 0.08rem;
  color: #bbbbbb;
  margin-top: 0.12rem;
}
.icon-zuojiantou {
  display: block;
  float: left;
  color: rgb(60, 35, 20);
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
.van-popup {
  width: 340px;
  text-align: center;
  height: 120px;
  line-height: 120px;
  border-radius: 7px;
}
.van-popup__close-icon {
  font-size: 0.18rem;
}
.van-icon {
  font-size: 0.2rem;
  vertical-align: middle;
}
.van-icon-arrow-left {
  position: absolute;
  left: 0.12rem;
  margin-top: 0.14rem;
}
</style>