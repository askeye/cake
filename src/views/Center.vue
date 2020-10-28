<template>
  <div class="center">
    <Topbar />
    <div class="cen_top">
      <div class="name">
        {{uname}}
      </div>
      <div class="eb">
        <span>预存余额￥</span>
        <span style="padding-right:0.28rem">0</span>
        <span>预存余额￥</span>
        <span>0</span>
      </div>
    </div>
    <div class="cen_bottom">
      <div class="cen_box">
        <div class="cen_item">
          <img src="https://m.ebeecake.com/dist/images/ico_order.png" alt="">
          <p>我的订单</p>
        </div>
        <div class="cen_item">
          <img src="https://m.ebeecake.com/dist/images/ico_addr.png" alt="">
          <p>地址管理</p>
        </div>
        <div class="cen_item">
          <img src="https://m.ebeecake.com/dist/images/ico_sfee.png" alt="">
          <p>购买免运费服务</p>
        </div>
        <div class="cen_item" @click="change_psw" >
          <img src="https://m.ebeecake.com/dist/images/ico_pwd.png" alt="">
          <p>修改密码</p>
        </div>
        <div class="cen_item">
          <img src="https://m.ebeecake.com/dist/images/ico_pl.png" alt="">
          <p>我的评论</p>
        </div>
      </div>
    </div>
    <div class="quit" @click="quit">
      退出
    </div>
  </div>
</template>

<script>
export default {
  name:'send',
  data(){
    return {
      uname:''
    }
  },
  mounted(){
    this.uname = localStorage.getItem('user');
  },
  methods:{
    quit(){
      localStorage.removeItem('user');
      this.$router.push({
        path:'/'
      })
    },
    change_psw(){
      this.$router.push({
        path:'/forget',
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if(to.path=='/center'){
      if(!localStorage.getItem('user')){
        next({
          path:'/sign'
        })
      }else{
        next()
      }
    }
  },
}
</script>

<style>
  .center{
    font-size: 0.12rem;
    color: rgb(60, 35, 20);
  }
  .cen_top{
    width: 100%;
    height: 0.975rem;
    box-sizing: border-box;
    padding-left: 0.21rem;
    background: 100%;
    background-image: url('https://m.ebeecake.com/dist/images/personal.png');
  }
  .name{
    padding-top:0.18rem;
    font-size: 0.2rem;
  }
  .eb{
    padding-top:0.18rem;
  }
 .cen_box{
   display: flex;
   flex-wrap: wrap;
 }
 .cen_item{
   width: 33.33%;
   text-align: center;
   padding: 0.18rem 0;
 }
 .cen_item img{
   display: block;
   width:0.3rem;
   height: 0.3rem;
   margin: auto;
 }
 .cen_item p{
   margin-top: 0.08rem;
 }
 .quit{
   height: 0.45rem;
   line-height: 0.45rem;
   margin-top: 0.75rem;
   text-align: center;
 }
</style>