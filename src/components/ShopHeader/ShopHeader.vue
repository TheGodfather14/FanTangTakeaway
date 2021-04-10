<template>
  <div class="shop-header">
    <nav class="shop-nav" :style="{ backgroundImage: `url(${info.bgImg})` }">
      <a class="back" @click="$router.back()">
        <i class="iconfont icon-left-angle"></i>
      </a>
    </nav>
    <div class="shop-content" @click="toggleShopShow">
      <img class="content-image" :src="info.avatar" />
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{ info.name }}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{ info.score }}</span>
          <span class="shop-message-detail">月售{{ info.sellCount }}单</span>
          <span class="shop-message-detail">
            {{ info.description }}
            <span>约{{ info.deliveryTime }}分钟</span>
          </span>
          <span class="shop-message-detail">距离{{ info.distance }}</span>
        </div>
      </div>
    </div>
    <div
      class="shop-header-discounts"
      v-if="info.supports"
      @click="toggleSupportShow"
    >
      <div class="discounts-left">
        <div class="activity" :class="supportClass[info.supports[0].type]">
          <span class="content-tag">
            <span class="mini-tag">{{ info.supports[0].name }}</span>
          </span>
          <span class="activity-content ellipsis">{{
            info.supports[0].content
          }}</span>
        </div>
      </div>
      <div class="discounts-right">{{ info.supports.length }}个优惠</div>
    </div>
    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
            <span class="content-tag">
              <span class="mini-tag">品牌</span>
            </span>
            <span class="content-name">{{info.name}}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{info.score}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{info.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{info.description}}</h3>
              <p>约{{info.deliveryTime}}分钟</p>
            </li>
            <li>
            <h3>{{info.deliveryPrice}}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{info.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title"><span>公告</span></h3>
          <div class="brief-modal-notice">{{info.bulletin}}</div>
          <div class="mask-footer">
            <span class="iconfont icon-guanbi" @click="toggleShopShow"></span>
          </div>
        </div>
        <div class="brief-modal-cover"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="activity-sheet" v-show="supportShow">
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list" v-if="info.supports">
            <li class="activity-item" :class="supportClass[support.type]" v-for="(support,index) in info.supports" :key='index'>
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </li>
          </ul>
          <div class="activity-sheet-close" @click="toggleSupportShow">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="activity-sheet-cover"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopHeader",
  data() {
    return {
      supportClass: ["activity-green", "activity-red", "activity-orange"],
      supportShow: false,
      shopShow: false,
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  methods: {
    toggleShopShow() {
      this.shopShow = !this.shopShow;
    },
    toggleSupportShow() {
      this.supportShow = !this.supportShow;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.shop-header
  background #fff
  color #fff
  height 100%
  overflow hidden
  position relative
  .shop-nav
    background-repeat no-repeat
    background-size cover
    height 40px
    padding 5px 10px
    position relative
    &::before
      background-color rgba(119, 103, 137, 0.43)
      bottom 0
      content ''
      left 0
      position absolute
      right 0
      top 0
    .back
      left 0
      position absolute
      top 10px
      .icon-left-angle
        color #fff
        display block
        font-size 20px
        padding 5px
  .shop-content
    background #fff
    display flex
    padding 30px 20px 5px 20px
    position relative
    text-align center
    img
      border-radius 2px
      box-shadow 0 0 0.4vw 0 rgba(0, 0, 0, 0.2)
      height 66px
      left 50%
      margin-left -33px
      margin-top -40px
      position absolute
      top 0
      width 66px
    .header-content
      flex 1
      width 72%
      .content-title
        align-items center
        color #333
        display flex
        font-size 20px
        font-weight 700
        justify-content center
        line-height 24px
        position relative
        white-space nowrap
        .content-tag
          background-image linear-gradient(90deg, #fff100, #ffe339)
          border-radius 2px
          color #6a3709
          font-style normal
          font-weight 700
          height 18px
          margin-right 10px
          position relative
          width 36px
          .mini-tag
            align-items center
            bottom -100%
            display flex
            font-size 24px
            font-weight 600
            justify-content center
            left 0
            position absolute
            right -100%
            top 0
            transform scale(0.5)
            transform-origin 0 0
        .content-name
          font-weight 700
          overflow hidden
          text-align left
          text-overflow ellipsis
        .content-icon
          height 16px
          position relative
          width 20px
          &::after
            border-color transparent transparent transparent rgba(0, 0, 0, 0.67)
            border-style solid
            border-width 6px 0 6px 7px
            content ''
            left 8px
            position absolute
            top 3px
    .shop-message
      color #333
      font-size 11px
      height 12px
      margin-top 8px
      white-space nowrap
      .shop-message-detail:not(:last-child)::after
        content ' \B7 '
        opacity 0.2
    .shop-notice
      color #999
      font-size 11px
      font-weight 300
      margin 8px auto 10px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      width 63%
  .shop-header-discounts
    align-items center
    background #fff
    border 1px solid #eee
    border-radius 1px
    color #666
    display flex
    font-size 11px
    margin 0 30px
    padding 5px 7px
    .discounts-left
      flex 1
      overflow hidden
      .activity
        align-items center
        display flex
        .content-tag
          background-color rgb(112, 188, 70)
          border-radius 1px
          color #fff
          font-style normal
          font-weight 700
          height 13px
          margin-right 5px
          position relative
          width 25px
          .mini-tag
            align-items center
            bottom -100%
            display flex
            font-size 18px
            font-weight 600
            justify-content center
            left 0
            position absolute
            right -100%
            top 0
            transform scale(0.5)
            transform-origin 0 0
    .discounts-right
      flex-shrink 0
      padding-right 10px
      position relative
      text-align right
      width 50px
      &::after
        border-color rgba(0, 0, 0, 0.57) transparent transparent
        border-style solid
        border-width 4px 4px 0
        content ''
        display block
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
  .shop-brief-modal
    align-items center
    bottom 0
    color #333
    display flex
    flex-direction column
    justify-content center
    left 0
    position fixed
    right 0
    top 0
    z-index 52
    &.fade-enter-active, &.fade-leave-active
      transition opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .brief-modal-cover
      background-color rgba(0, 0, 0, 0.5)
      height 100%
      left 0
      position absolute
      top 0
      width 100%
      z-index 1
    .brief-modal-content
      background #fff
      border-radius 5px
      display flex
      flex-direction column
      padding 25px 20px
      position relative
      width 80%
      z-index 99
      .content-title
        align-items center
        display flex
        font-size 20px
        font-weight 700
        justify-content center
        line-height 24px
        position relative
        white-space nowrap
        > span
          font-weight 600
        .content-tag
          background-image linear-gradient(90deg, #fff100, #ffe339)
          border-radius 2px
          color #6a3709
          font-style normal
          height 18px
          margin-right 10px
          position relative
          width 36px
          .mini-tag
            align-items center
            bottom -100%
            display flex
            font-size 24px
            justify-content center
            left 0
            position absolute
            right -100%
            top 0
            transform scale(0.5)
            transform-origin 0 0
      .brief-modal-msg
        display flex
        margin 20px -10px 0
        > li
          flex 1
          text-align center
          > h3
            color #333
            font-size 15px
            font-weight 600
            margin-bottom 8px
          > p
            color #999
            font-size 12px
      .brief-modal-title
        background-image linear-gradient(90deg, #fff, #333 50%, #fff)
        background-position 50%
        background-repeat no-repeat
        background-size 100% 1px
        margin 15px auto 15px
        position relative
        text-align center
        width 85px
        > span
          background-color #fff
          color #999
          font-size 12px
          padding 0 6px
      .brief-modal-notice
        color #333
        font-size 13px
        line-height 1.54
        overflow-y auto
      .mask-footer
        border 1px solid rgba(255, 255, 255, 0.7)
        border-radius 50%
        bottom -60px
        left 50%
        padding 6px
        position absolute
        transform translateX(-50%)
        span
          color rgba(255, 255, 255, 0.7)
          font-size 16px
  .activity-sheet
    height 100%
    left 0
    position fixed
    top 0
    width 100%
    z-index 99
    &.fade-enter-active, &.fade-leave-active
      transition opacity 0.3s
    &.fade-enter-active, &.fade-leave-active
      opacity 0
    .activity-sheet-content
      background-color #f5f5f5
      bottom 0
      box-shadow 0 -1px 5px 0 rgba(0, 0, 0, 0.4)
      box-sizing border-box
      color #333
      left 0
      padding 20px 30px
      position absolute
      right 0
      transition transform 0.2s
      will-change transform
      z-index 100
      .activity-sheet-title
        font-size 20px
        font-weight 600
        margin-bottom 20px
        text-align center
      .list
        font-size 16px
        height 160px
        overflow-y auto
        .activity-item
          align-items center
          display flex
          font-size 13px
          margin-bottom 12px
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color rgb(241, 136, 79)
          .content-tag
            border-radius 2px
            color #fff
            display inline-block
            font-style normal
            height 18px
            margin-right 10px
            position relative
            width 36px
            .mini-tag
              align-items center
              bottom -100%
              display flex
              font-size 24px
              justify-content center
              left 0
              position absolute
              right -100%
              top 0
              transform scale(0.5)
              transform-origin 0 0
      .activity-sheet-close
        height 25px
        position absolute
        right 6px
        top 10px
        width 25px
        > span
          font-size 20px
    .activity-sheet-cover
      background-color rgba(0, 0, 0, 0.5)
      height 100%
      left 0
      position absolute
      top 0
      width 100%
</style>