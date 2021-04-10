<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click="setSelectType(2)" :class="{active:selectType === 2}">
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" @click="setSelectType(0)" :class="{active:selectType === 0}">
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" @click="setSelectType(1)" :class="{active:selectType === 1}">
            不满意<span class="count">{{ratings.length - positiveSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:onlyShowText}" @click="toggleOnlyShowText()"> 
          <span class="iconfont icon-duigou"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img
                width="28"
                height="28"
                :src="rating.avatar"
              />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType === 0 ? 'icon-lianxiaolianmanyi-' : 'icon-buxihuan'"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {mapGetters, mapState} from "vuex"
import Star from "../../../components/Star/Star"
export default {
  name: "ShopRatings",
  data() {
    return {
      onlyShowText:true,
      selectType:2
    };
  },
  mounted() {
    this.$store.dispatch("getShopRatings",() => {
      this.$nextTick(() => {
        new BScroll(this.$refs.ratings,{
          click:true
        })
      })
    })
  },
  computed:{
    ...mapState(["info","ratings"]),
    ...mapGetters(["positiveSize"]),
    filterRatings(){
      const {ratings,onlyShowText,selectType} = this

      return ratings.filter(rating => {
        return (selectType === 2 || selectType === rating.rateType) && (!onlyShowText || rating.text.length > 0)
      })
    },

  },
  methods: {
    setSelectType(selectType){
      this.selectType = selectType
    },
    toggleOnlyShowText(){
      this.onlyShowText = !this.onlyShowText
    }
  },
  components:{
    Star,BScroll
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.ratings
  background #fff
  bottom 0
  left 0
  overflow hidden
  position absolute
  top 195px
  width 100%
  .overview
    display flex
    padding 18px 0
    .overview-left
      border-right 1px solid rgba(7, 17, 27, 0.1)
      flex 0 0 137px
      padding 6px 0
      text-align center
      width 137px
      @media only screen and (max-width 320px)
        flex 0 0 120px
        width 120px
      .score
        color rgb(255, 153, 0)
        font-size 24px
        line-height 28px
        margin-bottom 6px
      .title
        color rgb(7, 17, 27)
        font-size 12px
        line-height 12px
        margin-bottom 8px
      .rank
        color rgb(147, 153, 159)
        font-size 10px
        line-height 10px
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .score-wrapper
        font-size 0
        margin-bottom 8px
        .title
          color rgb(7, 17, 27)
          display inline-block
          font-size 12px
          line-height 18px
          vertical-align top
        .star
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          color rgb(255, 153, 0)
          display inline-block
          font-size 12px
          line-height 18px
          vertical-align top
      .delivery-wrapper
        font-size 0
        .title
          color rgb(7, 17, 27)
          font-size 12px
          line-height 18px
        .delivery
          color rgb(147, 153, 159)
          font-size 12px
          margin-left 12px
  .split
    background #f3f5f7
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    border-top 1px solid rgba(7, 17, 27, 0.1)
    height 16px
    width 100%
  .ratingselect
    .rating-type
      margin 0 18px
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        background rgba(77, 85, 93, 0.2)
        border-radius 1px
        color rgb(77, 85, 93)
        display inline-block
        font-size 12px
        line-height 16px
        margin-right 8px
        padding 8px 12px
        &.active
          background $green
          color #fff
        .count
          font-size 8px
          margin-left 2px
    .switch
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0
      line-height 24px
      padding 12px 18px
      &.on
        .icon-duigou
          color $green
      .icon-duigou
        display inline-block
        font-size 24px
        margin-right 4px
        vertical-align top
      .text
        display inline-block
        font-size 12px
        vertical-align top
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex 0 0 28px
        margin-right 12px
        width 28px
        img
          border-radius 50%
      .content
        flex 1
        position relative
        .name
          color rgb(7, 17, 27)
          font-size 10px
          line-height 12px
          margin-bottom 4px
        .star-wrapper
          font-size 0
          margin-bottom 6px
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            color rgb(147, 153, 159)
            display inline-block
            font-size 10px
            line-height 12px
            vertical-align top
        .text
          color rgb(7, 17, 27)
          font-size 12px
          line-height 18px
          margin-bottom 8px
        .recommend
          font-size 0
          line-height 16px
          .icon-lianxiaolianmanyi-, .icon-buxihuan, .item
            display inline-block
            font-size 9px
            margin 0 8px 4px 0
          .icon-lianxiaolianmanyi-
            color $yellow
          .icon-buxihuan
            color rgb(147, 153, 159)
          .item
            background #fff
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            color rgb(147, 153, 159)
            padding 0 6px
        .time
          color rgb(147, 153, 159)
          font-size 10px
          line-height 12px
          position absolute
          right 0
          top 0
</style>