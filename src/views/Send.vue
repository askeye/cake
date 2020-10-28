<template>
  <div class="send_wrap">
    <Topbar />
    <Menus />
    <div class="send_box" v-for="img in imgs" :key="img.id">
      <img :src="img.img" alt="">
    </div>
    <Backtop />
  </div>
</template>

<script>
export default {
  name:'send',
  data(){
    return {
      imgs:[{
        id:1,
        img:'https://images.ebeecake.com/images/hd/191016/m01.jpg'
      },{
        id:2,
        img:'https://images.ebeecake.com/images/hd/191016/m02.jpg'
      },{
        id:3,
        img:'https://images.ebeecake.com/images/hd/191016/m03.jpg'
      },{
        id:4,
        img:'https://images.ebeecake.com/images/hd/191016/m04.jpg'
      },{
        id:5,
        img:'https://images.ebeecake.com/images/hd/191016/m05.jpg'
      },{
        id:6,
        img:'https://images.ebeecake.com/images/hd/191016/m06.jpg'
      },{
        id:7,
        img:'https://images.ebeecake.com/images/hd/191016/m07.jpg'
      },{
        id:8,
        img:'https://images.ebeecake.com/images/hd/191016/m08.jpg'
      },{
        id:9,
        img:'https://images.ebeecake.com/images/hd/191016/m09.jpg'
      },{
        id:10,
        img:'https://images.ebeecake.com/images/hd/191016/m10.jpg'
      },{
        id:11,
        img:'https://images.ebeecake.com/images/hd/191016/m11.jpg'
      },{
        id:12,
        img:'https://images.ebeecake.com/images/hd/191016/m12.jpg'
      },{
        id:13,
        img:'https://images.ebeecake.com/images/hd/191016/m13.jpg'
      }]
    }
  }

}
</script>

<style>
.send_box{
  width: 100%;
}
.send_box img{
  display: block;
  width:100%;
}
</style>