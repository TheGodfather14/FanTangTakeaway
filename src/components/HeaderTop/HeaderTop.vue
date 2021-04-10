<template>
  <div class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </span>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: "HeaderTop",
  data() {
    return {};
  },
  props: {
    title: String,
  },
};
</script>

<style lang="stylus" rel='stylesheet/stylus'>
.header
  background-color #02a774
  height 45px
  left 0
  position fixed
  top 0
  width 100%
  z-index 100
  .header_search
    height 50%
    left 15px
    position absolute
    top 50%
    transform translateY(-50%)
    width 10%
    .icon-linedesign-12
      color #fff
      font-size 24px
  .header_title
    color #fff
    left 50%
    position absolute
    text-align center
    top 50%
    transform translate(-50%, -50%)
    width 50%
    .header_title_text
      color #fff
      display block
      font-size 20px
  .header_login
    color #fff
    font-size 14px
    position absolute
    right 15px
    top 50%
    transform translateY(-50%)
    .header_login_text
      color #fff
      .icon-lianxiaolianmanyi-
        font-size 25px
</style>