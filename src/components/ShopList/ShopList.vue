<template>
  <div class="shop_container">
    <ul class="shop_list" v-if='shops.length'>
      <li
        class="shop_li border-1px"
        v-for="(shop, index) in shops"
        :key="index"
        @click="$router.push('/shop')"
      >
        <a>
          <div class="shop_left">
            <img class="shop_img" src="./images/shop/1.jpg" />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{shop.name}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <Star :score='shop.rating' :size="24"></Star>
                <div class="rating_section">{{shop.rating}}</div>
                <div class="order_section">月售{{shop.recent_order_num}}单</div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{shop.float_minimum_order_amount}}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{shop.float_delivery_fee}}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
    <ul v-else>
      <li v-for='item in 6'>
        <img src="./images/shop_back.svg" alt="back" >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Star from "../Star/Star"
export default {
  name: "ShopList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["shops"]),
  },
  components:{
    Star
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
.shop_container
  margin-bottom 50px
  .shop_list
    .shop_li
      bottom-border-1px(#f1f1f1)
      width 100%
      >a
        clearFix()
        box-sizing border-box
        display block
        padding 15px 8px
        width 100%
        .shop_left
          box-sizing border-box
          float left
          height 75px
          padding-right 10px
          width 23%
          .shop_img
            display block
            height 100%
            width 100%
        .shop_right
          float right
          width 77%
          .shop_detail_header
            clearFix()
            width 100%
            .shop_title
              color #333
              float left
              font-size 16px
              font-weight 700
              line-height 16px
              width 200px
              &::before
                background-color #ffd930
                border-radius 2px
                color #333
                content '品牌'
                display inline-block
                font-size 11px
                line-height 11px
                margin-right 5px
                padding 2px 2px
            .shop_detail_ul
              float right
              margin-top 3px
              .supports
                border 1px solid #f1f1f1
                border-radius 2px
                color #999
                float left
                font-size 10px
                padding 0 2px
          .shop_rating_order
            clearFix()
            margin-bottom 8px
            margin-top 18px
            width 100%
            .shop_rating_order_left
              color #ff9a0d
              float left
              .rating_section
                color #ff6000
                float left
                font-size 10px
                margin-left 4px
              .order_section
                color #666
                float left
                font-size 10px
                transform scale(0.8)
            .shop_rating_order_right
              float right
              font-size 0
              .delivery_style
                border-radius 2px
                display inline-block
                font-size 12px
                padding 1px
                transform scale(0.7)
                transform-origin 35px 0
              .delivery_left
                background-color #02a774
                border 1px solid #02a774
                color #fff
                margin-right -10px
              .delivery_right
                border 1px solid #02a774
                color #02a774
          .shop_distance
            clearFix()
            font-size 12px
            width 100%
            .shop_delivery_msg
              color #666
              float left
              transform scale(0.9)
              transform-origin 0
            .segmentation
              color #ccc
</style>