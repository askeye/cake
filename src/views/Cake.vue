<template>
  <div class="cake">
    <Topbar />
    <!-- 八宫格 -->
    <div class="menu">
      <div
        class="menu_item"
        v-for="(menu, index) in menus"
        :key="menu.id"
        @click="goAnchor(index)"
      >
        <img :src="menu.img" alt="" />
        <span class="menu_name">{{ menu.name }}</span>
      </div>
    </div>
    <!-- 商品栏 -->
    <div class="wrap">
      <!--奶油蛋糕 -->
      <div class="cate" ref="0">
        <div class="cake_title">
          <h2>奶油蛋糕</h2>
          <p>选用法国铁塔乳脂奶油</p>
        </div>
        <div class="cakes">
          <div
            class="cake_item"
            v-for="cream in creams"
            :key="cream.id"
          >
            <img :src="cream.url" alt="" class="cake_img" @click="down(cream.id)"/>
            <p class="cake_title1" @click="down(cream.id)">{{ cream.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(cream.id)">{{ cream.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(cream.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 巧克力蛋糕 -->
      <div class="cate" ref="1">
        <div class="cake_title">
          <h2>巧克力蛋糕</h2>
          <p>采用可可脂含量62%的法芙娜巧克力</p>
        </div>
        <div class="cakes">
          <div
            class="cake_item"
            v-for="chocolate in chocolates"
            :key="chocolate.id"
          >
            <img :src="chocolate.url" alt="" class="cake_img" @click="down(chocolate.id)"/>
            <p class="cake_title1" @click="down(chocolate.id)">{{ chocolate.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(chocolate.id)">{{ chocolate.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(chocolate.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 冰激凌蛋糕 -->
      <div class="chocolates" ref="2">
        <div class="cake_title">
          <h2>冰激凌蛋糕</h2>
          <p>天然冰爽 意大利冰激凌</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="ice in ices" :key="ice.id" >
            <img :src="ice.url" alt="" class="cake_img" @click="down(ice.id)"/>
            <p class="cake_title1" @click="down(ice.id)">{{ ice.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(ice.id)">{{ ice.price }}</span>
             <van-cell
                is-link
                @click="
                  showPopup();
                  adds(ice.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 芝士蛋糕 -->
      <div class="chocolates" ref="3">
        <div class="cake_title">
          <h2>芝士蛋糕</h2>
          <p>皂感十足黄金乳酪</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="cheese in cheeses" :key="cheese.id">
            <img :src="cheese.url" alt="" class="cake_img" @click="down(cheese.id)"/>
            <p class="cake_title1" @click="down(cheese.id)">{{ cheese.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(cheese.id)">{{ cheese.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(cheese.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 咖啡下午茶 -->
      <div class="chocolates" ref="4">
        <div class="cake_title">
          <h2>咖啡下午茶</h2>
          <p>单独购买不满99元需收运费29元</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="tea in teas" :key="tea.id">
            <img :src="tea.url" alt="" class="cake_img" @click="down(tea.id)" />
            <p class="cake_title1" @click="down(tea.id)">{{ tea.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(tea.id)">{{ tea.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(tea.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 人气热销 -->
      <div class="chocolates" ref="5">
        <div class="cake_title">
          <h2>人气热销</h2>
          <p>明星单品 已售出100万+</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="recommond in recommonds" :key="recommond.id">
            <img :src="recommond.url" alt="" class="cake_img" @click="down(recommond.id)"/>
            <p class="cake_title1" @click="down(recommond.id)">{{ recommond.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(recommond.id)">{{ recommond.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(recommond.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 生日蛋糕 -->
      <div class="chocolates" ref="6">
        <div class="cake_title">
          <h2>生日蛋糕</h2>
          <p>属于你的特别日子 要吃大牌</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="bir in birs" :key="bir.id">
            <img :src="bir.url" alt="" class="cake_img" @click="down(bir.id)"/>
            <p class="cake_title1" @click="down(bir.id)">{{ bir.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(bir.id)">{{ bir.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(bir.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 馈赠推荐 -->
      <div class="chocolates" ref="7">
        <div class="cake_title">
          <h2>馈赠推荐</h2>
          <p>有品有质，送重要的人</p>
        </div>
        <div class="cakes">
          <div class="cake_item" v-for="give in gives" :key="give.id">
            <img :src="give.url" alt="" class="cake_img"  @click="down(give.id)"/>
            <p class="cake_title1" @click="down(give.id)">{{ give.title }}</p>
            <div class="cake_desc">
              <span class="cake_price" @click="down(give.id)">{{ give.price }}</span>
              <van-cell
                is-link
                @click="
                  showPopup();
                  adds(give.id);
                "
                class="add"
                >+</van-cell
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      :style="{ height: '300px' }"
    >
      <div class="cover" v-for="item in good" :key="item.id">
        <div class="cov_wrap">
          <p class="cake_tit">{{ item.title }}</p>
        </div>
        <div class="cake_desc1">
          <img src="http://images.ebeecake.com/img_c/size/f16.png" alt="" />
          <div class="cak_right">
            <div class="cak_item">
              <img
                src="https://images.ebeecake.com/img_c/size/sizes25.png"
                alt=""
              />
              <span>1.5磅(≥700克)</span>
            </div>
            <div class="cak_item">
              <img
                src="https://images.ebeecake.com/img_c/size/sizes25.png"
                alt=""
              />
              <span>1.5磅(≥700克)</span>
            </div>
            <div class="cak_item">
              <img
                src="https://images.ebeecake.com/img_c/size/sizes25.png"
                alt=""
              />
              <span>1.5磅(≥700克)</span>
            </div>
            <div class="cak_item">
              <img
                src="https://images.ebeecake.com/img_c/size/sizes25.png"
                alt=""
              />
              <span>1.5磅(≥700克)</span>
            </div>
            <div class="cak_price">
              <span>{{ item.price }}/</span>
              <span style="font-size: 0.13rem">16cm</span>
            </div>
          </div>
        </div>
        <ul class="cake_size">
          <li class="actives">16厘米</li>
        </ul>
        <div class="cak_btn_wrap">
          <span class="add_cart activess" @click="add_cart(item.id)">加入购物袋</span>
          <span class="cake_det" @click="down(item.id)">查看蛋糕详情</span>
        </div>
      </div>
    </van-popup>
    <Backtop />
  </div>
</template>

<script>
import "../assets/css/cake.css";

export default {
  name: "cake",
  data() {
    return {
      show: false,
      good: [],
      creams: [],
      cheeses: [],
      ices: [],
      teas: [],
      chocolates: [],
      recommonds:[],
      gives:[],
      birs:[],
      menus: [
        {
          id: 1,
          img: "https://m.ebeecake.com/dist/images/ico_ny.jpg",
          name: "奶油蛋糕",
        },
        {
          id: 2,
          img: "https://m.ebeecake.com/dist/images/ico_qkl.jpg",
          name: "巧克力蛋糕",
        },
        {
          id: 3,
          img: "https://m.ebeecake.com/dist/images/ico_bjl.jpg",
          name: "冰激凌蛋糕",
        },
        {
          id: 4,
          img: "https://m.ebeecake.com/dist/images/ico_zs.jpg",
          name: "芝士蛋糕",
        },
        {
          id: 5,
          img: "https://m.ebeecake.com/dist/images/ico_xwc.jpg",
          name: "咖啡下午茶",
        },
        {
          id: 6,
          img: "https://m.ebeecake.com/dist/images/ico_rq.jpg",
          name: "人气热销",
          
        },
        {
          id: 7,
          img: "https://m.ebeecake.com/dist/images/ico_hp.jpg",
          name: "生日蛋糕",
        },
        {
          id: 8,
          img: "https://m.ebeecake.com/dist/images/ico_sr.jpg",
          name: "馈赠推荐",
          
        },
      ],
    };
  },
  mounted() {
    this.getGoods();
    this.recommend();
    this.bir();
    this.give();
  },
  methods: {
    give(){
      this.axios.get(`http://localhost:3000/index?tab=give`).then(res=>{
        this.gives =res.data.data;
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
    recommend(){
      this.axios.get(`http://localhost:3000/index?tab=recommend`).then(res=>{
        this.recommonds =res.data.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    goAnchor(i) {
      window.scrollTo(0, this.$refs[i].offsetTop); // chrome
    },
    showPopup() {
      this.show = true;
    },
    adds(i) {
      this.axios
        .get(`http://localhost:3000/cover?id=${i}`)
        .then((res) => {
          this.good = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    down(i) {
      this.$router.push({
        path: `/detail/${i}`,
      });
    },
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
          console.log('aaa',res);
          if(res.data.data.length==0){
            this.add_good(i);
          }else{
            console.log('表中有数据，num+1',);
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
        this.show = false;
        this.$toast.fail('请先登录');
      }
    },
    getGoods() {
      this.axios
        .get("http://localhost:3000/goods")
        .then((res) => {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "cream") {
              this.creams.push(arr[i]);
            }
            if (arr[i].type == "Cheese") {
              this.cheeses.push(arr[i]);
            }
            if (arr[i].type == "ice") {
              this.ices.push(arr[i]);
            }
            if (arr[i].type == "tea") {
              this.teas.push(arr[i]);
            }
            if (arr[i].type == "chocolates") {
              this.chocolates.push(arr[i]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>