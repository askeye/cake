<template>
  <div class="code">
    <a class="laber-code" @click='random'>{{$store.state.code}}</a>
  </div>
</template>

<script>
export default {
  mounted(){
    this.random();
  },
  methods:{
    random(){
      var str = '';
      var angle;
      for(var i=0;i<4;i++){
        str+= parseInt(Math.random()*10);
      }
      this.$store.state.code = str
    }

  }
}
</script>

<style>
.code{
  display: inline-block;margin-top: 0.12rem;
  font-size: 0.15rem;
  letter-spacing: 0.016rem;
}
.laber-code {
  display: block;
  width: 0.68rem;
  height: 0.24rem;
  line-height: 0.24rem;
  text-align: center;
  border: 1px solid rgb(60, 35, 20);
}
</style>