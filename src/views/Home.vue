 <template>
  <div class="index">
    <Topbar/>
    <Menus />
    <!-- 轮播区域 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#3C2314">
        <van-swipe-item v-for="banner in banners" :key="banner.id" @click="banne(banner.id)">
          <img :src="banner.img" alt="" />
        </van-swipe-item>        
      </van-swipe>
    </div>
    <!-- 蛋糕推荐 -->
    <div class="recommend">
      <div class="title">
        <span class="rec">蛋糕推荐</span>
        <img
          src="https://m.ebeecake.com/dist/images/ico_3.png"
          alt=""
          class="title_img"
        />
        <router-link to="/cake/0" class="more">更多</router-link>
      </div>
      <div class="goods">
        <div
          class="goods_item"
          v-for="(recommend, index) in recommonds"
          :key="index"
          @click="det(recommend.id)"
        >
          <img :src="recommend.url" alt="" class="goods_img" />
          <p class="goods_title">{{ recommend.title }}</p>
          <p class="goods_price">{{ recommend.price }}起</p>
        </div>
      </div>
    </div>
    <!-- 庆生蛋糕 -->
    <div class="recommend">
      <div class="title">
        <img
          src="https://m.ebeecake.com/dist/images/ico_1.png"
          alt=""
          class="title_img"
          style="padding-left: 0.21rem"
        />
        <span class="rec" style="margin-left: 0.1rem">庆生蛋糕</span>
        <router-link to="/cake/0" class="more">更多</router-link>
      </div>
      <div class="goods">
        <div
          class="goods_item"
          v-for="(item, index) in birs"
          :key="index"
          @click="det(item.id)"
        >
          <img :src="item.url" alt="" class="goods_img" />
          <p class="goods_title">{{ item.title }}</p>
          <p class="goods_price">{{ item.price }}起</p>
        </div>
      </div>
    </div>
    <!-- 精选食材 -->
    <div class="recommend">
      <div class="title" >
        <img
          src="https://m.ebeecake.com/dist/images/ico_2.png"
          alt=""
          class="title_img"
          style="padding-left: 0.21rem"
        />
        <span class="rec" style="margin-left: 0.1rem">精选食材</span>
        <router-link to='/fdetail/0' class="more">更多</router-link>
      </div>
      <div class="list">
        <div class="item" v-for="(food, index) in foods" :key="index" @click="go_fdetail(food.id)">
          <img :src="food.img" alt="" class="item_img" />
          <div class="item_title">{{ food.title }}</div>
          <p class="item_desc">{{ food.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menus: [
        {
          id: 1,
          src: "https://m.ebeecake.com/dist/images/menu_1.jpg",
          title: "蛋糕",
        },
        {
          id: 2,
          src: "https://m.ebeecake.com/dist/images/ico_xwc.jpg",
          title: "咖啡下午茶",
        },
        {
          id: 3,
          src: "https://m.ebeecake.com/dist/images/pg.jpg",
          title: "送全国",
        },
        {
          id: 4,
          src: "https://m.ebeecake.com/dist/images/menu_3.jpg",
          title: "个人中心",
        },
      ],
      banners: [
        {
          id: 1,
          img: "https://images.ebeecake.com/images/hd/200520/mb.jpg",
        },
        {
          id: 2,
          img: "https://images.ebeecake.com/images/hd/200415/mb.jpg",
        },
        {
          id: 3,
          img: "https://images.ebeecake.com/img/4467.jpg",
        },
        {
          id: 4,
          img:"https://images.ebeecake.com/images/hd/190830/mb.jpg" ,
        },
        {
          id: 5,
          img: "https://images.ebeecake.com/images/hd/180906/mb.jpg",
        }
      ],
      recommonds: [],
      birs:[],
      foods: [],
    };
  },
  mounted(){
    this.recommend();
    this.bir();
    this.food()
  },
  methods:{
    recommend(){
      this.axios.get(`http://localhost:3000/index?tab=recommend`).then(res=>{
        this.recommonds =res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    bir(){
      this.axios.get(`http://localhost:3000/index?tab=bir`).then(res=>{
        this.birs =res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    food(){
      this.axios.get(`http://localhost:3000/food`).then(res=>{
        this.foods =res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    go_fdetail(i){
      console.log(i);
      this.$router.push({
        path:`/fdetail/${i}`,
      })
    },
    banne(id){
      this.$router.push({
        path:`/banner/${id}`,
      })
    },
    det(id){
      this.$router.push({
        path:`/detail/${id}`,
      })
    },
  }
};
</script>

<style scoped>
  @import "../assets/css/home.css";
</style>
            



           
        