<template>
  <div class="detail">
    <Topbar>
      <slot class="det_tt" >
        <van-icon name="arrow-left" @click="back" />
        <router-link to="/" style="vertical-align: middle">返回</router-link>
      </slot>
    </Topbar>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#3C2314">
      <van-swipe-item v-for="(item, index) in data" :key="index">
        <img :src="item" alt="" class="det_img" />
      </van-swipe-item>
    </van-swipe>
    <div class="det_content">
      <div class="info">
        <h3>{{ title }}</h3>
        <div class="size_box">16厘米 | 更多规格</div>
      </div>
      <div class="det_fix">
        <div class="midu">
          <span>密度</span>
          <span class="i_box">
            <i :class="['det_nor',{'activea':index<zd}]" v-for="(icon,index) in 5" :key="index"></i> 
          </span>
        </div>
        <div class="zhidu">
          <span>芝度</span>
          <span class="i_box">
            <i :class="['det_nor',{'activea':index<md}]" v-for="(icon,index) in 5" :key="index"></i> 
          </span>
        </div>
        <div class="det_info">16厘米 | 适合3-6人食用 ｜ +6套餐具</div>
        <div class="det_price">￥335</div>
      </div>
    </div>
    <div class="img_box_wrap">
      <div class="imgbox" v-for="img in img_box" :key="img.id">
        <img :src="img.imgurl" alt="" />
      </div>
    </div>
    <div class="det_Cart">
      <span @click="add_cart($route.params.id)">加入购物车</span>
    </div>
    <van-popup v-model="err" closeable style="width: 340px;
      text-align: center;
      height: 120px;
      line-height: 120px;
      border-radius: 7px;
      font-size:0.12rem
      letter-spacing: 0.01rem;
      color:rgb(60,35,20)">
      请先登录！
    </van-popup>
    <Backtop />
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      data: [],
      title: "",
      img_box:[],
      err:false,
      zd:'',
      md:''
    };
  },
  mounted() {
    this.get();
    this.detail();
    this.axios.get(`http://localhost:3000/test`).then(res=>{
      console.log(JSON.parse(res.data.data[0].arrs));
    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    add_good(index){
      this.axios.get(`http://localhost:3000/cart_list?id=${index}&user=${localStorage.getItem('user')}&num=1`).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    add(i){
      this.axios.get(`http://localhost:3000/add_num?id=${i}`).then(res=>{
      }).catch(err=>{
        console.log(err);
      })
    },
    add_cart(i){
      if(localStorage.getItem('user')){
        this.axios.get(`http://localhost:3000/check_id?goods_id=${i}&user=${localStorage.getItem('user')}`).then(res=>{
          if(res.data.data.length==0){
            this.add_good(i);
          }else{
            this.add(i);
          }
        }).catch(err=>{
          console.log(err);
        })
        this.$toast.success('加入成功');
        var that = this;
        setTimeout(function(){
          that.$router.push({
            path:`/cart`
          })
        },2000)
      }else if(localStorage.getItem('user') == null){
        this.err = true;
      }
    },
    back() {
      this.$router.go(-1)
    },
    detail(){
      this.axios.get(`http://localhost:3000/detail_img?goods_id=${this.$route.params.id}`).then(res=>{
        this.img_box = res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    get() {
      var id = this.$route.params.id;
      this.axios
        .get(`http://localhost:3000/detail?id=${id}`)
        .then((res) => {
          this.data.push(res.data.data[0].banner1);
          this.data.push(res.data.data[0].banner2);
          this.data.push(res.data.data[0].banner3);
          this.title = res.data.data[0].title;
          this.zd = res.data.data[0].zd;
          this.md = res.data.data[0].md;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.detail {
  font-size: 0.12rem;
  color: #3c2314;
  letter-spacing: 0.0075rem;
}
.van-icon-arrow-left {
  font-size: 0.2rem;
  vertical-align: middle;
}
.det_img {
  display: block;
  width: 100%;
}
.van-swipe__indicator {
  width: 0.08rem;
  height: 0.08rem;
  background-color: #fff;
  margin: 0 0.05rem;
  border-radius: 50%;
}
.det_content {
  font-size: 0.12rem;
  letter-spacing: 0.0075rem;
  color: #3c2314;
  padding: 0.28rem 0.21rem 0 0.21rem;
}
.info h3 {
  display: inline-block;
  font-size: 0.2rem;
  height: 0.36rem;
  line-height: 0.36rem;
}
.size_box {
  border: 1px solid #e7e7e7;
  height: 0.32rem;
  line-height: 0.32rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  float: right;
}
.det_fix {
  padding-top: 0.1rem;
}
.zhidu,
.midu {
  margin-right: 0.1rem;
  padding-bottom: 0.05rem;
}
.det_nor.activea {
  background-image: url("https://m.ebeecake.com/dist/images/yellow_oval_1.png");
}
.det_nor {
  background-image: url("https://m.ebeecake.com/dist/images/gray_oval_1.png");
  display: inline-block;
  height: 0.09rem;
  width: 0.09rem;
  background-size: 0.09rem;
  margin-right: 0.03rem;
}
.i_box {
  margin-left: 0.1rem;
  display: inline-block;
}
.det_info {
  margin-top: 0.21rem;
  letter-spacing: 0.01rem;
}
.det_price {
  font-size: 0.2rem;
  color: #aa8764;
  margin-top: 0.21rem;
  letter-spacing: 0.02rem;
}
.img_box_wrap {
  margin-top: 0.35rem;
}
.imgbox img {
  width: 100%;
  display: block;
}
.det_Cart {
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding-top: 0.06rem;
  height: 0.43rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 10;
}
.det_Cart span {
  position: absolute;
  display: block;
  width: 88%;
  line-height: 0.35rem;
  height: 0.35rem;
  background-color: #3c2314;
  color: #fff;
  font-size: 0.12rem;
  letter-spacing: 0.013rem;
  left:6%;
  right: 6%;
  z-index: 10;
}
</style>