<template>
  <div class="address">
    <div class="login1_tit">
      <van-icon name="arrow-left" @click="back"/>
      <span>编辑地址</span>
    </div>
    <van-address-edit
    :area-list="areaList"
    :address-info="edits[0]"
    show-postal
    :show-delete='bool'
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete(edits[0].id)"
    @change-default="check"
  />
  </div>

</template>

<script>
export default {
  data() {
    return {
      bool:false,
      areaList:{
         province_list: {
          410000: '河南省',
         },
         city_list: {
           410100: '郑州市',
         },
         county_list: {
          410102: '中原区',
          410103: '二七区',
          410104: '管城回族区',
          410105: '金水区',
          410106: '上街区',
          410108: '惠济区',
          410122: '中牟县',
          410181: '巩义市',
          410182: '荥阳市',
          410183: '新密市',
          410184: '新郑市',
          410185: '登封市',
          410190: '高新技术开发区',
          410191: '经济技术开发区',
         }
      },
      searchResult: [],
      edits:[],
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    check(val){
      if(val){
        this.axios.get(`http://localhost:3000/false?user=${localStorage.getItem('user')}`).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        }) 
      }
    },
    getList(){
      var id = this.$route.params.id;
      console.log(id);
      if(id==0){
        this.bool=false
      }else{
        this.bool=true;
        this.axios.get(`http://localhost:3000/address?id=${id}&user=${localStorage.getItem('user')}`).then(res=>{
          this.edits = res.data.data;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    onSave(content) {
      if(this.$route.params.id==0){
        var address = content.province + content.city + content.country + content.addressDetail;
        this.axios.get(`http://localhost:3000/add_address?pro=${content.province}&county=${content.county}&addressDetail=${content.addressDetail}&city=${content.city}&tel=${content.tel}&name=${content.name}&user_phone=${localStorage.getItem('user')}&areaCode=${content.areaCode}&postalCode=${content.postalCode}&isDefault=${content.isDefault}&address=${address}`
        )
        .then(res=>{
          this.$toast.success('添加成功');
          setTimeout(()=>{this.$router.go(-1)},2000)
        }).catch(err=>{
          console.log(err);
        })
      }else{
        // 更新数据
        var address =  content.province + content.city + content.country + content.addressDetail;
        this.axios.get(`http://localhost:3000/updata_address?id=${this.$route.params.id}&pro=${content.province}&county=${content.county}&addressDetail=${content.addressDetail}&city=${content.city}&tel=${content.tel}&name=${content.name}&user_phone=${localStorage.getItem('user')}&areaCode=${content.areaCode}&postalCode=${content.postalCode}&isDefault=${content.isDefault}&address=${address}`
        )
        .then(res=>{   
          this.$toast.success('更新成功');
          setTimeout(()=>{this.$router.go(-1)},2000)
        }).catch(err=>{
        })
      }

    },
    onDelete(i) {
      this.axios.get(`http://localhost:3000/del_address?id=${i}&user=${localStorage.getItem('user')}`).then(res=>{
        this.$toast.success('删除成功');
        setTimeout(()=>{this.$router.go(-1)},2000)
      }).catch(err=>{
      })
      setTimeout(()=>{
        this.$router.go(-1);
      },2000)
    },
  },
};
</script>

<style scoped>
.address,.van-cell{
  font-size: 0.12rem;
  letter-spacing: 0.013rem;
  color:rgb(60, 35, 20);
}
.van-address-edit{
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
.van-button__content{
    text-align: center;
    width: 3.33rem;
    height: 0.35rem;
    line-height: 0.35rem;
    background-color: #3C2314!important;
    color: #FBF5DD;
}


</style>