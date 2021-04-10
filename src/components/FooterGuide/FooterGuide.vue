<template>
  <div class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" :class="{on:'/msite'===$route.fullPath}" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:'/search'===$route.fullPath}" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-soushuo"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:'/order'===$route.fullPath}" @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-icon--copy"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:'/profile'===$route.fullPath}" @click="goTo('/profile')"> 
      <span class="item_icon">
        <i class="iconfont icon-profile"></i>
      </span>
      <span>我的</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
  data() {
    return {};
  },
  methods:{
      goTo(path){
          this.$router.replace(path)
      }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
.footer_guide // footer
  top-border-1px(#e4e4e4)
  background-color #fff
  bottom 0
  display flex // 弹性盒
  height 50px
  left 0
  position fixed // 在视口位置固定
  right 0
  width 100%
  z-index 100 // 元素堆叠顺序
  .guide_item
    align-items center // 在居中对齐弹性盒
    color #999999
    display flex
    flex 1
    flex-direction column // 纵向排列
    margin 5px
    text-align center // 居中
    text-decoration none
    &.on
      color #02a774
    span
      font-size 12px // 字体大小
      margin-bottom 2px // 上下margin
      margin-top 2px
      .iconfont
        font-size 20px // 图标大小
</style>