<template>
  <div class="add_address">
    <div class="login1_tit">
      <van-icon name="arrow-left" @click="back"/>
      <span>地址管理</span>
    </div>
    <van-cell-group>
      <van-cell title="+添加配送地址" @click="onAdd"/>
    </van-cell-group>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
       default-tag-text="[默认地址]"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: 0,
      list: [],
      address:'',
    };
  },
  mounted(){
    this.get()
  },
  methods: {
    get(){
      this.axios.get(`http://localhost:3000/address?user=${localStorage.getItem('user')}`).then(res=>{
        this.list = res.data.data;
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].isDefault=='true'){
            this.chosenAddressId = res.data.data[i].id
          };
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    onAdd() {
      this.$router.push(`/address/0`)
    },
    onEdit(item, index) {
      this.$router.push(`/address/${item.id}`)
    },
    back(){
      this.$router.go(-1)
    },
  },
};
</script>

<style scoped>
  .add_address,.van-address-item__name{
    font-size: 0.12rem;
    letter-spacing: 0.0075rem;
    color:rgb(60, 35, 20)
  }
  .van-cell__title{
    text-align: center;
    font-size: 0.12rem;
    letter-spacing: 0.013rem;
    color:rgb(60, 35, 20);
    border-bottom: 1px solid #e7e7e7;
    height: 49px;
    line-height: 49px;
    padding: 0;
  }
  .login1_tit {
  background: #fff;
  height: 0.48rem;
  line-height: 0.48rem;
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  text-align: center;
  font-size: 0.14rem;
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
.van-address-list{
  padding: 0;
}
.van-address-list__bottom{
  display: none;
}
.van-tag--danger{
  background-color: #fff;
}
.van-tag{
  color: #AA8764;
}

</style>