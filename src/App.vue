<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <Footer/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
@import './assets/css/reset.css';
.van-field_control,.van-field__label{
  font-size: 0.12rem!important;
  color:rgb(60, 35, 20)!important;
  letter-spacing: 0.013rem!important;
}
.van-cell__title{
  width: 0.65rem!important;
}
.van-button--danger{
  background-color: #3c2314!important;
  color: #fbf5dd!important;
  height: 0.35rem!important;
  line-height: 0.35rem!important;
  width: 3.33rem!important;
  border-radius: 0!important;
  margin: 0 auto!important;
  border: none!important;
}
.laber-code{
  margin-left: 0.6rem;
}
</style>
