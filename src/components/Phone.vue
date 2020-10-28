<template>
  <div>
    <ul class="laber_list">
      <li class="laber_item">
        <span>手机号</span>
        <input type="text" class="laber_ipt" placeholder="请输入手机号码" />
      </li>
      <li class="laber_item">
        <span>验证码</span>
        <input type="text" class="laber_ipt" placeholder="请输入验证码" />
        <Code></Code>
      </li>
      <li class="laber_item">
        <span>短信码</span>
        <input type="text" class="laber_ipt" placeholder="请输入密码" />
        <span class="laber-send">发送验证码</span>
      </li>
    </ul>
    <a href="###" class="laber_sign">登录</a>
    <router-link to="/login" class="login">新会员注册</router-link>
    <router-link to="/sign" class="forget">忘记密码？</router-link>
  </div>
</template>

<script>


export default {
  name: "phone",
};
</script>

<style scoped>
.laber_item {
  font-size: 0.12rem;
  color: rgb(60, 35, 20);
  border-bottom: 1px solid #e7e7e7;
  height: 0.48rem;
  line-height: 0.48rem;
  padding: 0 0.08rem;
}
.laber_item span {
  display: inline-block;
  width: 0.68rem;
}
.laber_ipt {
  border: none;
  display: inline-block;
}
.laber_sign {
  display: block;
  margin: 0.35rem auto 0.3rem auto;
  width: 3.3rem;
  height: 0.35rem;
  line-height: 0.35rem;
  background: rgb(60, 35, 20);
  text-align: center;
  font-size: 0.14rem;
  color: #fff;
}
.forget,
.login,
.laber-send {
  font-size: 0.12rem;
  color: rgb(60, 35, 20);
  display: block;
  float: right;
}
.login {
  margin-right: 0.24rem;
  margin-left: 0.15rem;
  letter-spacing: 0.0075rem;
}
</style>