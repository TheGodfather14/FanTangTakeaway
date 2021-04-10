<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{ info.description }}</span>
            <span
              >由商家配送提供配送， 约{{ info.deliveryTime }}分钟送达， 距离{{
                info.distance
              }}m</span
            >
          </div>
          <div class="delivery-money">配送费￥{{ info.deliveryPrice }}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            v-for="(support, index) in info.supports"
            :key="index"
            :class="supportClasses[support.type]"
          >
            <span class="content-tag">
              <span class="mini-tag">{{ support.name }}</span>
            </span>
            <span class="activity-content">{{ support.content }}</span>
          </div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUl">
            <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span> <span>{{ info.category }}</span>
          </li>
          <li>
            <span class="bold">商家电话</span> <span>{{ info.phone }}</span>
          </li>
          <li>
            <span class="bold">地址</span> <span>{{ info.address }}</span>
          </li>
          <li>
            <span class="bold">营业时间</span> <span>{{ info.workTime }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
export default {
  name: "ShopInfo",
  data() {
    return {
      supportClasses: ["activity-green", "activity-red", "activity-orange"],
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  mounted() {
    if (!this.info.pics) {
      return;
    }
    this._initScroll();
  },
  methods: {
    _initScroll() {
      new BScroll(".shop-info");
      const ul = this.$refs.picsUl;
      const space = 6;
      const liWidth = 120;
      const count = this.info.pics.length;
      ul.style.width = (space + liWidth) * count - space + "px";
      new BScroll(".pic-wrapper", {
        scrollX: true,
      });
    },
  },
  watch: {
    info() {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.shop-info
  background #fff
  bottom 0
  left 0
  overflow hidden
  position absolute
  top 195px
  width 100%
  .section
    background-color #fff
    border-bottom 1px solid #eee
    color #666
    font-size 16px
    padding 16px 14px 14px
    position relative
    .section-title
      color #000
      font-weight 700
      line-height 16px
      > .iconfont
        color #ccc
        float right
    .delivery
      font-size 13px
      line-height 18px
      margin-top 16px
      .delivery-icon
        background-color #0097ff
        border-radius 4px
        color #fff
        display inline-block
        font-size 11px
        margin-right 10px
        padding 1px 0
        text-align center
        width 55px
      .delivery-money
        margin-top 5px
    .activity
      margin-top 16px
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
    .pic-wrapper
      margin-top 16px
      overflow hidden
      white-space nowrap
      width 100%
      .pic-list
        font-size 0
        .pic-item
          display inline-block
          height 90px
          margin-right 6px
          width 120px
          &:last-child
            margin 0
    .detail
      margin-bottom -16px
      > li
        align-items center
        display flex
        justify-content space-between
        line-height 16px
        margin-right -10px
        padding 16px 12px 16px 0
        bottom-border-1px(#ddd)
        font-size 13px
        > .bold
          color #333
          font-weight 700
        &:last-child
          border-none()
  .split
    background #f3f5f7
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    border-top 1px solid rgba(7, 17, 27, 0.1)
    height 16px
    width 100%
</style>