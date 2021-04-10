<template>
  <div>
    <shop-header />
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader";
export default {
  name: "Shop",
  data() {
    return {};
  },
  components: { ShopHeader },
  mounted() {
    this.$store.dispatch("getShopInfo");
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.tab
  background #fff
  height 40px
  line-height 40px
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    color rgb(77, 85, 93)
    float left
    font-size 14px
    text-align center
    width 33.33333%
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          background #02a774
          bottom 1px
          content ''
          height 2px
          left 50%
          position absolute
          transform translateX(-50%)
          width 35px
</style>