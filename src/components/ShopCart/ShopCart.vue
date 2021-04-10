<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount }">
              <i
                class="iconfont icon-gouwuche"
                :class="{ highlight: totalCount }"
              ></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount }">
            ￥{{ totalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{ payText }}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { messageBox } from "mint-ui";
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import CartControl from "../../components/CartControl/CartControl";
export default {
  components: { CartControl },
  name: "ShopCart",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    toggleShow() {
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },
    clear() {
        messageBox.confirm("确认清空购物车吗？").then(action => {
            this.$store.dispatch("clearCart")
        },action =>{} )
    },
  },
  computed: {
    ...mapState(["cartFoods", "info"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`;
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "结算";
      }
    },
    listShow() {
      if (this.totalCount === 0) {
        this.isShow = false;
        return false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          //单列保护
          if (!this.scroll) {
            this.scroll = new BScroll(".list-content", {
              click: true,
            });
          } else {
            //刷新 重新统计高度
            this.scroll.refresh();
          }
        });
      }
      return this.isShow;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.shopcart
  bottom 0
  height 48px
  left 0
  position fixed
  width 100%
  z-index 50
  .content
    background #141d27
    color rgba(255, 255, 255, 0.4)
    display flex
    font-size 0
    .content-left
      flex 1
      .logo-wrapper
        background #141d27
        border-radius 50%
        box-sizing border-box
        display inline-block
        height 56px
        margin 0 12px
        padding 6px
        position relative
        top -10px
        vertical-align top
        width 56px
        .logo
          background #2b343c
          border-radius 50%
          height 100%
          text-align center
          width 100%
          &.highlight
            background $green
          .icon-gouwuche
            color #80858a
            font-size 24px
            line-height 44px
            &.highlight
              color #fff
        .num
          background rgb(240, 20, 20)
          border-radius 16px
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          color #ffffff
          font-size 9px
          font-weight 700
          height 16px
          line-height 16px
          position absolute
          right 0
          text-align center
          top 0
          width 24px
      .price
        box-sizing border-box
        color #fff
        display inline-block
        font-size 16px
        font-weight 700
        line-height 24px
        margin-top 5px
        padding-right 12px
        vertical-align top
        &.highlight
          color #fff
      .desc
        display inline-block
        font-size 10px
        margin-bottom 15px
        margin-left -45px
        vertical-align bottom
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        color #fff
        font-size 12px
        font-weight 700
        height 48px
        line-height 48px
        text-align center
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .ball-container
    .ball
      bottom 22px
      left 32px
      position fixed
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      z-index 200
      .inner
        background $green
        border-radius 50%
        height 16px
        transition all 0.4s linear
        width 16px
  .shopcart-list
    left 0
    position absolute
    top 0
    transform translateY(-100%)
    width 100%
    z-index -1
    &.move-enter-active, &.move-leave-active
      transition transform 0.3s
    &.move-enter, &.move-leave-to
      transform translateY(0)
    .list-header
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      height 40px
      line-height 40px
      padding 0 18px
      .title
        color rgb(7, 17, 27)
        float left
        font-size 14px
      .empty
        color rgb(0, 160, 220)
        float right
        font-size 12px
    .list-content
      background #fff
      max-height 217px
      overflow hidden
      padding 0 18px
      .food
        box-sizing border-box
        padding 12px 0
        position relative
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          color rgb(7, 17, 27)
          font-size 14px
          line-height 24px
        .price
          bottom 12px
          color rgb(240, 20, 20)
          font-size 14px
          font-weight 700
          line-height 24px
          position absolute
          right 90px
        .cartcontrol-wrapper
          bottom 6px
          position absolute
          right 0
.list-mask
  backdrop-filter blur(10px)
  background rgba(7, 17, 27, 0.6)
  height 100%
  left 0
  opacity 1
  position fixed
  top 0
  width 100%
  z-index 40
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-to
    background rgba(7, 17, 27, 0)
    opacity 0
</style>