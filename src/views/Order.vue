<template>
  <div class="order">
    <div class="login1_tit">
      <van-icon name="arrow-left" @click="back"/>
      <span>地址管理</span>
    </div>
    <div class="oreder_wrap">
      <!-- <div class="order_item"></div> -->
      <p style="text-align:center;margin-top:0.15rem">暂未开放...</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      goods:[],
    }
  },
  mounted(){
    this.getOrder()
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getOrder(){
      this.axios.get(`http://localhost:3000/allOrder?user=${localStorage.getItem('user')}`).then(res=>{
        // console.log(res);
        this.orders =res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  },
};
</script>

<style scoped>
.order{
  font-size: 0.12rem;
  letter-spacing: 0.013rem;
  color: rgb(60, 35, 20);
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