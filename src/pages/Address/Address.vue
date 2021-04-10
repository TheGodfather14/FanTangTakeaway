<template>
  <el-container direction="vertical">
    <el-header>
      <header-top title="省份列表"> </header-top>
    </el-header>
    <el-container class="current-city" direction="vertical">
      <el-row class="firstline">
        <el-col :span="11"
          ><div class="firstline-left">当前定位城市：</div></el-col
        >
        <el-col :span="13"
          ><div class="firstline-right">
            定位不准时，请在下方进行选择
          </div></el-col
        >
      </el-row>
      <el-row class="second-line"><div>哈尔滨</div></el-row>
    </el-container>
    <el-row class="interval"><div></div></el-row>
    <el-container class="provinces" direction="vertical">
      <el-row class="provinces-firstline">省份列表</el-row>
      <el-row class="provinces-table">
        <el-col
          align="middle"
          :span="6"
          v-for="(provinceName, num, index) in addressProvince"
          :key="index"
          class="province-item"
        >
          <div @click="changeProvince" :provinceId='num'>
            {{ provinceName | ellipsis }}
          </div>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
export default {
  name: "Address",
  computed: {
    ...mapState(["addressProvince","addressCity"]),
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 4) {
        return value.slice(0, 4) + "...";
      }
      return value;
    },
  },
  components: {
    HeaderTop,
  },
  data() {
    return {
    };
  },
  methods: {
    changeProvince(event) {
      let province
      let el = event.currentTarget
      province = el.attributes["provinceId"].value
      if(province == 11||province == 12||province == 31||province == 50){
        console.log('直辖市')//有四个直辖市  后期需要处理  直接跳转到搜索位置
      }else{
        this.$store.dispatch("getAddressCity",province)
        this.$router.push("/city")
      }
    },
  },
  
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.current-city
  height 85px
  .firstline
    border-bottom 1px solid #e4e4e4
    height 44px
    .firstline-left
      color #666697
      font-size 15px
      line-height 44px
    .firstline-right
      color #9f9f9f
      font-size 13px
      line-height 44px
  .second-line
    border-bottom 1px solid #e4e4e4
    color #3190ec
    font-size 20px
    height 41px
    line-height 41px
.provinces
  display block
  .provinces-firstline
    border-bottom 1px solid #e4e4e4
    border-top 1px solid #e4e4e4
    font-size 15px
    height 34px
    line-height 34px
  .provinces-table
    border-left 1px solid #e4e4e4
    .province-item
      border-bottom 1px solid #e4e4e4
      border-right 1px solid #e4e4e4
      font-size 15px
      height 50px
      line-height 50px
      text-overflow ellipsis
.interval
  background-color #f5f5f5
  height 13px
</style>