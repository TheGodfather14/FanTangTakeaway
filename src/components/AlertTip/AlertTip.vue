<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{ alertText }}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    alertText: String,
  },
  methods: {
    closeTip() {
      this.$emit("closeTip");
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
@keyframes tipMove
  0%
    transform scale(1)
  35%
    transform scale(0.8)
  70%
    transform scale(1.1)
  100%
    transform scale(1)
.alert_container
  background rgba(0, 0, 0, 0.5)
  bottom 0
  left 0
  position fixed
  right 0
  top 0
  z-index 200
  .tip_text_container
    align-items center
    animation tipMove 0.4s
    background-color rgba(255, 255, 255, 1)
    border 1px
    border-radius 5px
    display flex
    flex-direction column
    justify-content center
    left 50%
    margin-left -110px
    margin-top -90px
    padding-top 20px
    position absolute
    top 50%
    width 60%
    .tip_icon
      align-items center
      border 2px solid #f8cb86
      border-radius 50%
      display flex
      flex-direction column
      font-size 20px
      height 55px
      justify-content center
      width 55px
      span:nth-of-type(1)
        background-color #f8cb86
        height 30px
        width 2px
      span:nth-of-type(2)
        background-color #f8cb86
        border 1px
        border-radius 50%
        height 2px
        margin-top 2px
        width 2px
    .tip_text
      color #333
      font-size 14px
      line-height 20px
      margin-top 10px
      padding 0 5px
      text-align center
    .confrim
      background-color #4cd964
      border 1px
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
      color #fff
      font-size 18px
      font-weight bold
      line-height 35px
      margin-top 10px
      text-align center
      width 100%
</style>