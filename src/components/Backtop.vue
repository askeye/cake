<template>
  <div class="back">
    <div :class="{ active: isActive }" @click="back" style="display:none">
      <div class="tip_top"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Backtop",
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    window.addEventListener('scroll',this.scroll)
  },
  destroyed(){
    window.removeEventListener('scroll',this.scroll)
  },
  methods: {
    scroll() {
      var that = this;
      window.onscroll= function () {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 800) {
          that.isActive = true;
        }else{
          that.isActive = false;
        }
      };
    },
    back() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
.active {
  display: block !important;
}
.tip_top{
  position: fixed;
    right: 2px;
    bottom: 2px;
    z-index: 99998;
    cursor: pointer;
    width: 40px;
    height: 37px!important;
    text-align: center;
    white-space: normal;
    font-size: 14px;
    line-height: 17px;
    padding-top: 3px;
    color: #fff;
    background: url('https://pic.liesio.com/2020/10/22/d93d036bba2f0.png') no-repeat -42px center #666;
}
</style>