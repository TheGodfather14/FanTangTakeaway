<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
      <div class="cart-count" v-if="food.count">{{ food.count }}</div>
      <div class="iconfont icon-jia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  data() {
    return {};
  },
  props: {
    food: Object,
  },
  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  font-size 0
  .cart-decrease
    color rgb(0, 160, 220)
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
  .icon-remove
    color $green
    display inline-block
    font-size 20px
    line-height 24px
    padding 6px
    &.move-enter-active, &.move-leave-active
      transition all 0.3s
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    color rgb(147, 153, 159)
    display inline-block
    font-size 10px
    line-height 24px
    padding-top 6px
    text-align center
    vertical-align top
    width 12px
  .icon-jia
    color $green
    display inline-block
    font-size 20px
    line-height 24px
    padding 6px
</style>