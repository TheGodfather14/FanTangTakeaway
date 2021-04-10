<template>
  <transition name="fade">
    <div class="food" v-if="isShow">
      <div class="food-content">
        <div class="image-header">
          <img v-lazy="food.image" />
          <p class="foodpanel-desc">{{ food.info }}</p>
          <div class="back" @click="toggleShow">
            <i class="iconfont icon-left-angle"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice"
              >￥{{ food.oldPrice }}</span
            >
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food" />
          </div>
        </div>
      </div>
      <div class="food-cover" @click="toggleShow"></div>
    </div>
  </transition>
</template>

<script>
import CartControl from "../../components/CartControl/CartControl";
export default {
  components: { CartControl },
  name: "Food",
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    food: Object,
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.food
  bottom 48px
  left 0
  position fixed
  top 0
  width 100%
  z-index 101
  &.fade-enter-active, &.fade-leave-active
    transition opacity 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
  .food-content
    background #fff
    border-radius 5px
    height 65%
    left 50%
    position absolute
    top 50%
    transform translate(-50%, -50%)
    width 80%
    z-index 66
    .image-header
      height 0
      padding-top 100%
      position relative
      width 100%
      img
        height 100%
        left 0
        position absolute
        top 0
        width 100%
      .foodpanel-desc
        bottom 0
        color #ddd
        font-size 10px
        left 0
        letter-spacing 0
        padding 0 10px 10px
        position absolute
        right 0
      .back
        left 0
        position absolute
        top 10px
        .icon-left-angle
          color #fff
          display block
          font-size 20px
          padding 10px
    .content
      padding 18px
      position relative
      .title
        color rgb(7, 17, 27)
        font-size 14px
        font-weight 700
        line-height 14px
        margin-bottom 8px
      .detail
        font-size 0
        height 10px
        line-height 10px
        margin-bottom 18px
        .sell-count, .rating
          color rgb(147, 153, 159)
          font-size 10px
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          color rgb(240, 20, 20)
          font-size 14px
          margin-right 8px
        .old
          color rgb(147, 153, 159)
          font-size 10px
          text-decoration line-through
      .cartcontrol-wrapper
        bottom 12px
        position absolute
        right 12px
      .buy
        background rgb(0, 160, 220)
        border-radius 12px
        bottom 18px
        box-sizing border-box
        color #fff
        font-size 10px
        height 24px
        line-height 24px
        padding 0 12px
        position absolute
        right 18px
        z-index 10
        &.fade-transition
          opacity 1
          transition all 0.2s
        &.fade-enter, &.fade-leave
          opacity 0
  .food-cover
    background-color rgba(0, 0, 0, 0.5)
    bottom -48px
    left 0
    position absolute
    right 0
    top 0
    z-index 55
</style>