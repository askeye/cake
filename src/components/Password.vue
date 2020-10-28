<template>
  <div class="password">
    <ul class="laber_list">
      <li class="laber_item">
        <span>账号</span>
        <input
          type="text"
          class="laber_ipt"
          placeholder="请输入手机号码"
          v-model="uname"
        />
      </li>
      <li class="laber_item">
        <span>密码</span>
        <input
          type="text"
          class="laber_ipt"
          placeholder="请输入密码"
          v-model="psw"
        />
      </li>
    </ul>
    <span class="laber_sign" @click="sign">登录</span>
    <van-popup v-model="check" closeable>该手机号未注册</van-popup>
    <van-popup v-model="success">登录成功</van-popup>
    <van-popup v-model="kong" closeable>手机号或密码不能为空！</van-popup>
    <van-popup v-model="numb" closeable>请输入正确的手机号</van-popup>
    <van-popup v-model="wrong" closeable>用户名或密码错误，请重新输入！</van-popup>
    <router-link to="/login" class="login">新会员注册</router-link>
    <span class="forget">忘记密码？</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      psw: "",
      check: false,
      success: false,
      kong: false,
      numb: false,
      wrong: false,
    };
  },
  methods: {
    sign() {
      if (this.uname == "" || this.psw == "") {
        this.kong = true;
        return;
      }
      if (this.uname != "" && this.psw != "") {
        var reg = /^1[34578]\d{9}$/;
        var bool = reg.test(this.uname);
        if (!bool) {
          this.numb = true;
          return;
        } else if (bool) {
          this.numb = false;
          this.axios
            .get(`http://localhost:3000/selects?tel='${this.uname}'`)
            .then((res) => {
              if (res.data.data.length > 0) {
                if (this.psw == res.data.data[0].password) {
                  this.success = true;
                  localStorage.setItem("user", res.data.data[0].tel);
                  var that = this;
                  setTimeout(function () {
                    that.$router.push({
                      path: "/",
                    });
                  }, 1500);
                } else {
                  this.wrong = true;
                }
              } else if (res.data.data.length == 0) {
                this.check = true;
                this.psw = "";
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
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
.login {
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
.van-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
.van-popup {
  width: 340px;
  text-align: center;
  height: 120px;
  line-height: 120px;
  border-radius: 7px;
  font-size: 0.12rem;
}
.van-popup__close-icon{
  font-size: 0.18rem;
}
</style>