<template>
  <section class="order">
    <header-top title="订单列表">
    </header-top>
    <section class="order_no_login">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop';
export default {
  name: "component_name",
  data() {
    return {};
  },
  components:{
    HeaderTop
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.order // 订单
  width 100%
  .order_no_login
    margin 0 auto
    padding-top 140px
    text-align center
    width 60%
    >img
      display block
      height 30%
      width 100%
    >h3
      color #6a6a6a
      font-size 17px
      padding 10px 0
    >button
      background #02a774
      border 0
      border-radius 5px
      color #fff
      display inline-block
      font-size 14px
      outline none
      padding 10px 20px
</style>