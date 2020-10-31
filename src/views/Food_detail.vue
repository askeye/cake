<template>
  <div class="detail_food">
    <Topbar></Topbar>
    <div class="fo_det_item" v-for="(list, index) in lists" :key="index" :ref="index">
      <img :src="list.img" alt="" class="fo_det_img" />
      <p class="fo_det_title">{{ list.content_title }}</p>
      <div class="fo_det_content" v-html="list.content"></div>
    </div>
    <Backtop />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    };
  },
  mounted() {
    this.select();
  },
  methods: {
    scroll(){
      if(this.$route.params.id==1){
        window.scrollTo()
      }
    },
    select() {
      this.axios
        .get(`http://localhost:3000/food`)
        .then((res) => {
          this.lists = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.fo_det_img {
  display: block;
  width: 100%;
  margin-bottom: 0.18rem;
}
.fo_det_title {
  background-color: #fff;
  font-size: 0.15rem;
  color: rgb(60, 35, 20);
  border: 1px solid #e7e7e7;
  padding: 0.05rem 0.15rem;
  font-weight: bold;
  display: inline-block;
  height: 0.32rem;
  line-height: 0.32rem;
  position: absolute;
  top: 3.45rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 2.3rem;
  text-align: center;
}
.fo_det_item {
  position: relative;
  letter-spacing: 0.0075rem;
}
.fo_det_content {
  text-align: left;
  margin: 0.12rem 0.16rem 0 0.16rem;
  line-height: 0.216rem;
  font-size: 0.12rem;
  color: #3c2314;
}
</style>