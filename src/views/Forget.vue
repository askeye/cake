<template>
  <div class="login1">
    <div class="login1_tit">
      <van-icon name="arrow-left" @click="back"/>
      <span>设置密码</span>
    </div>
    <div class="log_list">
      <ul>
        <li class="log_item">
          <span>密码:</span>
          <input
            type="text"
            placeholder="请输入新密码"
            v-model="new_psw"
            @blur="test"
          />
          <van-popup v-model="show" closeable>新密码不能与旧密码一致</van-popup>
        </li>
        <li class="log_item">
          <span>确认密码:</span>
          <input type="text" placeholder="请确认新密码" v-model="ensure" @blur="corrent"/>
          <van-popup v-model="cose" closeable>新密码与确认密码不一致</van-popup>
        </li>
      </ul>
      <span class="go_login" @click="setup">确认完成</span>
      <van-popup v-model="yes" closeable>修改完成</van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name:'forget',
  data(){
    return {
      new_psw:'',
      ensure:'',
      cose:false,
      show:false,
      yes:false
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    test(){
      // 验证密码是否和之前的密码一样
      this.axios.get(`http://localhost:3000/selects?tel=${localStorage.getItem('user')}`).then(res=>{
        console.log(111,res);
        if(this.new_psw == res.data.data[0].password){
          this.show = true;
          this.new_psw = '';
          return;
        }else{
          this.show = false
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    corrent(){
      // 确认密码和密码输入的值是否一致
      if(this.new_psw != this.ensure){
        this.cose = true;
        this.ensure = '';
      }
    },
    setup(){
      // 确认完成
      if(this.ensure !='' && this.new_psw !=''){
        this.axios.get(`http://localhost:3000/psw_change?new=${this.new_psw}&user="${localStorage.getItem('user')}"`).then(res=>{
          console.log(res);
          this.yes = true;
          var that = this;
          setTimeout(function(){
            that.$router.go(-1)
          },2000)
        }).catch(err=>{
          console.log(err);
        })
      }
    }

  }
}
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
  letter-spacing: 0.013rem;
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