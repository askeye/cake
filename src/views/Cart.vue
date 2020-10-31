<template>
  <div class="cart">
    <Topbar :lists="lists">
      <img
        src="https://m.ebeecake.com/dist/images/ico_2.png"
        alt=""
        @click="back"
        class="top_img"
      />
    </Topbar>
    <div class="cart_list_wrap" v-if="lists.length > 0">
      <ul class="cart_list">
        <li class="cart_item" v-for="good in lists" :key="good.id">
          <van-card :thumb="good.url">
            <template #desc>
              <p>16厘米</p>
              <div class="cart_item_desc">
                <p>适合3-6人食用 | +6套餐具</p>
                <span style="color: #aaa" @click="del(good.id)">删除</span>
              </div>
            </template>

            <template #title>
              <div class="cart_item_title">
                <h5>{{ good.title }}</h5>
                <div class="step">
                  <i class="jian_cart" @click="jian(good.goods_id)"></i>
                  <span class="num">{{ good.num }}</span>
                  <i class="add_cartss" @click="add(good.goods_id)"></i>
                </div>
              </div>
            </template>

            <template #price>
              <div class="cart_item_price">
                <span>{{ good.price }}/件</span>
                <span style="color: #aa8764">{{ good.price }}</span>
              </div>
            </template>
          </van-card>
        </li>
      </ul>
      <div class="cart_info">
        <van-cell-group>
          <van-cell title="配送" />
          <van-field
            v-model="receive_name"
            label="收货人"
            placeholder="不是本人收货时请填写"
          />
          <van-field
            v-model="receive_phone"
            label="收货手机"
            placeholder="不是本人收货时请填写"
          />
          <van-field
            v-model="adress"
            label="详细地址"
            placeholder="请填写详细地址"
          />
        </van-cell-group>
        <van-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          description="这是一段描述信息"
          close-on-click-action
        />
      </div>
      <van-submit-bar
        id="cart_submit"
        label="实付："
        :price="sum * 100"
        decimal-length:0
        button-text="下单"
        button-color="#3C2314"
        @submit="submit"
      />
    </div>
    <div class="cart_none" v-else>
      <h3 class="cart_none_title">您的购物袋中还没有蛋糕</h3>
      <router-link to="/">&lt;&lt;返回首页</router-link>
      <router-link to="/cake/0">选购蛋糕>></router-link>
      <hr
        style="
          border: 1px dashed #e7e7e7;
          margin-top: 0.1rem;
          margin-bottom: 0.15rem;
        "
      />
      <div class="cart_add" style="margin-top: 0.5rem">
        <div class="cart_line">
          <span class="ad_tit">为您推荐</span>
          <p class="ad_line"></p>
        </div>
        <div class="add_item">
          <div
            class="cake_item"
            v-for="cart_ad in ads"
            :key="cart_ad.id"
            @click="down(cart_ad.id)"
          >
            <img :src="cart_ad.url" alt="" class="cake_img" />
            <p class="cake_title1">{{ cart_ad.title }}</p>
            <div class="cake_desc">
              <span class="cake_price">{{ cart_ad.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="yes" closeable>购买成功</van-popup>
    <van-popup v-model="numb" closeable>请输入正确的手机号</van-popup>
  </div>
</template>

<script>
export default {
  name: "cart",
  inject: ["reload"],
  data() {
    return {
      yes: false,
      numb: false,
      adress: null,
      receive_name: null,
      receive_phone: null,
      show: false,
      ads: [],
      value: 3,
      actions: [
        { name: "选项一" },
        { name: "选项二" },
        { name: "选项三", subname: "描述信息" },
      ],
      lists: [],
      sum: 0,
    };
  },
  mounted() {
    this.get_cart();
    this.give();
    this.getAddress()
  },
  methods: {
    getAddress(){
      this.axios.get(`http://localhost:3000/address?user=${localStorage.getItem('user')}`).then(res=>{
        console.log(res);
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].isDefault=='true'){
            console.log(1111);
            this.receive_name = res.data.data[i].name;
            this.receive_phone = res.data.data[i].tel;
            this.adress = res.data.data[i].address;
          }
        }
      })
    },
    refresh() {
      this.reload();
    },
    submit() {
      if (
        this.receive_phone != "" &&
        this.receive_phone != "" &&
        this.adress != ""
      ) {
        this.axios
          .get(
            `http://localhost:3000/order?user_tel=${localStorage.getItem(
              "user"
            )}&receive_phone=${this.receive_phone}&receive_name=${
              this.receive_name
            }&receive_address=${this.adress}&good=${JSON.stringify(this.lists)}`
          )
          .then((res) => {
            this.success();
            this.get_cart();
            this.$toast.success("购买成功！测试商品不发货");
          });
      }else{
        this.$toast.fail('请填写信息')
      }
    },
    success() {
      this.axios
        .get(
          `http://localhost:3000/success?user=${localStorage.getItem("user")}`
        )
        .then((res) => {
        })
        .catch((err) => {
        });
    },
    down(i) {
      this.$router.push({
        path: `/detail/${i}`,
      });
    },
    give() {
      this.axios
        .get(`http://localhost:3000/index?tab=give`)
        .then((res) => {
          this.ads = res.data.data;
        })
        .catch((err) => {
        });
    },
    back() {
      this.$router.go(-1);
    },
    jian(i) {
      this.axios
        .get(`http://localhost:3000/change_cart?id=${i}`)
        .then((res) => {
          this.get_cart();
        })
        .catch((err) => {
        });
    },
    add(i) {
      this.axios
        .get(`http://localhost:3000/add_num?id=${i}`)
        .then((res) => {
          this.get_cart();
        })
        .catch((err) => {
        });
    },
    del(i) {
      this.axios
        .get(
          `http://localhost:3000/del_cart?id=${i}&user=${localStorage.getItem(
            "user"
          )}`
        )
        .then((res) => {
          this.get_cart();
        })
        .catch((err) => {
        });
    },

    get_cart() {
      if (localStorage.getItem("user")) {
        this.axios
          .get(
            `http://localhost:3000/get_cart?user=${localStorage.getItem(
              "user"
            )}`
          )
          .then((res) => {
            this.sum = 0;
            this.lists = res.data.data;
            this.$store.commit("change", res.data.data);
            for (var i = 0; i < res.data.data.length; i++) {
              var a = res.data.data[i].price;
              this.sum += Number(res.data.data[i].num * Number(a.substr(1)));
              if (res.data.data[i].num == 0) {
                this.axios
                  .get(
                    `http://localhost:3000/del_cart?id=${
                      res.data.data[i].id
                    }&user=${localStorage.getItem("user")}`
                  )
                  .then((res) => {
                    this.refresh();
                  })
                  .catch((err) => {
                  });
              }
            }
          })
          .catch((err) => {
          });
      }
    },
  },
};
</script>

<style scoped>
.cart {
  font-size: 0.12rem;
  color: #3c2314;
  letter-spacing: 0.0075rem;
}

.cart_list_wrap {
  font-size: 0.12rem;
  letter-spacing: 0.0075rem;
  color: rgb(60, 35, 20);
}
.cart_list {
  padding-left: 0.21rem;
}
.cart_item {
  border-bottom: 1px solid #e7e7e7;
  padding: 0.15rem 0;
}
.van-card__thumb {
  width: 0.78rem;
  height: 0.78rem;
  border: 1px solid #e7e7e7;
  float: left;
}
.van-card {
  padding: 0;
  color: rgb(60, 35, 20);
}
.van-card__thumb img {
  border-radius: 0;
  border: 1px solid #e7e7e7;
}
.van-card__thumb {
  margin-right: 0.16rem;
}
.van-card__content {
  margin-right: 0.21rem;
}
.van-card__content p {
  color: #aa8764;
  padding: 0.04rem 0;
}
.cart_item_title {
  display: flex;
  justify-content: space-between;
  height: 0.24rem;
  line-height: 0.24rem;
}
.cart_item_desc {
  display: flex;
  justify-content: space-between;
  height: 0.16rem;
  line-height: 0.16rem;
}
.van-card__price {
  display: block;
}
.cart_item_price {
  padding-top: 0.145rem;
  border-top: 1px solid #e7e7e7;
  margin-top: 0.145rem;
  display: flex;
  justify-content: space-between;
}
.van-submit-bar__text,
.van-submit-bar__price,
.van-submit-bar__price {
  color: rgb(60, 35, 20);
  font-size: 0.14rem;
}
.van-submit-bar__bar {
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0;
}
.van-button--danger {
  width: 1.1rem !important;
}
.van-button {
  border-radius: 0;
}
.van-submit-bar {
  position: fixed;
  bottom: 0;
}
.jian_cart,
.add_cartss {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  background-size: 0.24rem;
  position: relative;
  vertical-align: middle;
}
.jian_cart {
  background-image: url("https://m.ebeecake.com/dist/images/subtract.png");
}
.add_cartss {
  background-image: url("https://m.ebeecake.com/dist/images/add.png");
}
.num {
  display: inline-block;
  vertical-align: middle;
  width: 0.25rem;
  height: 0.24rem;
  line-height: 0.24rem;
  text-align: center;
}
.cart_none {
  letter-spacing: 0.0075rem;
  color: rgb(60, 35, 20);
}
.cart_none_title {
  font-size: 0.15rem;
  padding-top: 0.23rem;
  text-align: center;
}
.cart_none a {
  display: inline-block;
  font-size: 0.12rem;
  color: rgb(60, 35, 20);
  border: 1px solid #e7e7e7;
  width: 40%;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  margin: 0.2rem 5%;
  box-sizing: border-box;
}
.cake_item {
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}
.cake_img {
  display: block;
  width: 100%;
}
.cake_title1 {
  font-size: 0.12rem;
  color: #3c2314;
  letter-spacing: 0.0075rem;
  margin-top: 0.0375rem;
  text-align: center;
}
.cake_desc {
  margin: 5px 0.12rem;
  border: 1px solid #e7e7e7;
  height: 0.28rem;
  line-height: 0.28rem;
  text-align: center;
}

.cake_price {
  color: #3c2314;
  font-size: 0.12rem;
  letter-spacing: 0.0075rem;
}
.add_item {
  display: flex;
  flex-wrap: wrap;
}
.ad_line {
  width: 90%;
  margin: 0 5%;
  height: 0.02rem;
  background-color: #e7e7e7;
}
.ad_tit {
  font-size: 0.12rem;
  position: absolute;
  top: -0.06rem;
  background: #fff;
  left: 0;
  right: 0;
  width: 0.55rem;
  margin: auto;
  text-align: center;
}
.cart_line {
  position: relative;
  margin-bottom: 0.15rem;
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