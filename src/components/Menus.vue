<template>
  <van-sticky>
    <!-- 菜单区域 -->
    <div class="menu">
      <router-link :to="menu.push" v-for="menu in menus" :key="menu.id" >
        <img :src="menu.src" alt="" />
        <span>{{ menu.title }}</span>
      </router-link>
    </div>
  </van-sticky>
</template>

<script>
export default {
  name: "menus",
  data() {
    return {
      menus: [
        {
          id: 1,
          src: "https://m.ebeecake.com/dist/images/menu_1.jpg",
          title: "蛋糕",
          push:'/cake/0'
        },
        {
          id: 2,
          src: "https://m.ebeecake.com/dist/images/ico_xwc.jpg",
          title: "咖啡下午茶",
          push:'cake/1'
        },
        {
          id: 3,
          src: "https://m.ebeecake.com/dist/images/pg.jpg",
          title: "送全国",
          push:'/send'
        },
        {
          id: 4,
          src: "https://m.ebeecake.com/dist/images/menu_3.jpg",
          title: "个人中心",
          push:'/center'
        },
      ],
    };
  },
};
</script>

<style>
</style>