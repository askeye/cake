<template>
  <div class="banner_box">
    <Topbar />
    <Menus />
    <div class="img_box" v-for="(arr, index) in arrs" :key="index">
      <img :src="arr" alt="" class="bann_img" />
    </div>
    <Backtop />
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      arrs: [],
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      var id = this.$route.params.id;
      this.axios
        .get(`http://localhost:3000/banner?id=${id}`)
        .then((res) => {
          this.arrs.push(res.data.data[0].img1);
          this.arrs.push(res.data.data[0].img2);
          this.arrs.push(res.data.data[0].img3);
          this.arrs.push(res.data.data[0].img4);
          this.arrs.push(res.data.data[0].img5);
          this.arrs.push(res.data.data[0].img6);
          this.arrs.push(res.data.data[0].img7);
          this.arrs.push(res.data.data[0].img8);
          this.arrs.push(res.data.data[0].img9);
          this.arrs.push(res.data.data[0].img0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.bann_img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>