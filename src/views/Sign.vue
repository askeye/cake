<template>
  <div class="sign">
    <Topbar />
    <div class="tab">
      <router-link to="/sign/phone" @click.native="change(0)" :class="{activeq:flag=='0'}">手机验证码登录</router-link>
      <router-link to="/sign/password" @click.native="change(1)" :class="{activeq:flag=='1'}">密码登录</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "sign",
  data(){
    return {
      flag:0
    }
  },
  methods:{
    change(i){
      this.flag = i;
      console.log(this.flag);
    }
  }
};
</script>

<style>
.tab {
  display: flex;
  text-align: center;
}
.tab a {
  width: 50%;
  background-color: #fff;
  height: 0.45rem;
  line-height: 0.45rem;
  color:rgb(60, 35, 20);
  font-size: 0.12rem;
}
.tab a.activeq {
  border-bottom: 3px solid #c8b49b;
  color: #c8b49b;
}
</style>