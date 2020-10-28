<template>
  <div class="address">
    <Topbar />
    <van-address-edit
    :area-list="areaList"
    show-postal
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
  />
  </div>

</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>

</style>