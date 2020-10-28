<template>
  <div class="topbar">
      <slot class="left_logo" >
        <!-- @click="home" -->
        <img src="https://m.ebeecake.com/dist/images/ico_2.png" alt="" @click="home" class="top_img" >
      </slot>
      <router-link to='/' class="middle_logo"></router-link>
      <div class="right">
        <router-link to="/cart" class="cart"></router-link>
        <span class="topbar_num">{{$store.state.lists.length }}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  props:['lists'],
  methods:{
    home(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .topbar{
    /* display: flex; */
    height: 0.48rem;
    line-height: 0.48rem;
    position: relative;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    padding-left:0.12rem
  }
  .left_logo,.middle_logo,.cart{
    display: block;
  }
  .top_img{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top:0;
    bottom:0;
    margin:auto 0 auto 0.12rem;
  }
  .middle_logo{
    background: url('https://m.ebeecake.com/dist/images/logo_txt.png');
    background-size: 100%;
    height: 0.13rem;
    width:0.83rem;
    margin:auto;
    position: absolute;
    right:0;
    left:0;
    top:0;
    bottom:0;
  }
  .cart{
    background: url('https://m.ebeecake.com/dist/images/ico_cart.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    height: 0.3rem;
    width:0.35rem;
    margin: auto;
    position: absolute;
    right:0.12rem;
    top:0;
    bottom:0;
  }
  .topbar_num{
    position: absolute;
    display: block;
    background: #3C2314;
    color: #fff;
    bottom: 0.06rem;
    right: 0.06rem;
    height: 0.18rem;
    width: 0.18rem;
    line-height: 0.18rem;
    border-radius: 50%;
    text-align: center;
    letter-spacing: 0;
  }
</style>
