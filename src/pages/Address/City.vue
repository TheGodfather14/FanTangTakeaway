<template>
  <el-container direction="vertical">
    <el-header>
      <header-top title="城市列表"> </header-top>
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
    <el-container class="cities" direction="vertical">
      <el-row class="cities-firstline">城市列表</el-row>
      <el-row class="cities-table">
        <el-col
          align="middle"
          :span="6"
          v-for="(city, index) in addressCity"
          :key="index"
          class="cities-item"
        >
          <div @click="changeCity" :cityName="city">
            {{ city | ellipsis }}
          </div>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
export default {
  name: "Address",
  created() {
    this.$store.dispatch("getAddressCity");
  },
  computed: {
    ...mapState(["addressCity"]),
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
  methods: {
    changeCity(event) {
      let city
      let el = event.currentTarget
      city = el.attributes["cityName"].value
      //dispatch
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
.interval
  background-color #f5f5f5
  height 13px
.cities
  display block
  .cities-firstline
    border-bottom 1px solid #e4e4e4
    border-top 1px solid #e4e4e4
    font-size 15px
    height 34px
    line-height 34px
  .cities-table
    border-left 1px solid #e4e4e4
    .cities-item
      border-bottom 1px solid #e4e4e4
      border-right 1px solid #e4e4e4
      font-size 15px
      height 50px
      line-height 50px
      text-overflow ellipsis
</style>