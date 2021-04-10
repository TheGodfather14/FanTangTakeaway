<template>
  <section class="profile">
    <header-top title="我的"> </header-top>
    <section class="profile-number">
      <router-link
        :to="userInfo._id ? '/userinfo' : '/login'"
        class="profile-link"
      >
        <div class="profile_image">
          <i class="iconfont icon-yonghu"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">
            {{ userInfo.name || "登录/注册" }}
          </p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">{{
              userInfo.phone || "暂无绑定手机号"
            }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-iconleft"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-icon--copy"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-iconleft"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-jifen1"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-iconleft"></i>
          </span>
        </div>
      </a>
      <!-- 硅谷外卖会员卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-huiyuan1"></i>
        </span>
        <div class="my_order_div">
          <span>饭堂VIP</span>
          <span class="my_order_icon">
            <i class="iconfont icon-iconleft"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwuzhongxin"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-iconleft"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <mt-button
        type="danger"
        style="width: 100%"
        v-if="userInfo._id"
        @click="logout"
        >退出登录</mt-button
      >
    </section>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
export default {
  name: "component_name",
  data() {
    return {};
  },
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    logout() {
      MessageBox.confirm("确认退出吗？").then(
        (action) => {
          this.$store.dispatch("logout");
          Toast('登出完成')
        },
        (action) => {}
      );
    },
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
.profile // 我的
  overflow hidden
  width 100%
  .profile-number
    margin-top 45.5px
    .profile-link
      clearFix()
      background #02a774
      display block
      padding 20px 10px
      position relative
      .profile_image
        border-radius 50%
        float left
        height 60px
        overflow hidden
        vertical-align top
        width 60px
        .icon-yonghu
          background #e4e4e4
          font-size 60px
      .user-info
        float left
        margin-left 15px
        margin-top 8px
        p
          color #fff
          font-size 18px
          font-weight 700
          &.user-info-top
            padding-bottom 8px
          .user-icon
            display inline-block
            height 20px
            margin-left -15px
            margin-right 5px
            width 20px
            .icon-shouji
              font-size 25px
              vertical-align text-top
          .icon-mobile-number
            color #fff
            font-size 14px
      .arrow
        height 12px
        position absolute
        right 15px
        top 40%
        width 12px
        .icon-iconleft
          color #fff
          font-size 5px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    background #fff
    overflow hidden
    width 100%
    .info_data_list
      clearFix()
      .info_data_link
        border-right 1px solid #f1f1f1
        float left
        text-align center
        width 33%
        .info_data_top
          color #333
          display block
          font-size 14px
          padding 15px 5px 10px
          width 100%
          span
            color #f90
            display inline-block
            font-size 30px
            font-weight 700
            line-height 30px
        .info_data_bottom
          color #666
          display inline-block
          font-size 14px
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    top-border-1px(#e4e4e4)
    background #fff
    margin-top 10px
    .my_order
      align-items center
      display flex
      padding-left 15px
      >span
        align-items center
        display flex
        height 20px
        width 20px
        >.iconfont
          font-size 25px
          margin-left -10px
        .icon-icon--copy
          color #02a774
        .icon-jifen1
          color green
          font-size 30px
        .icon-huiyuan1
          color #f90
        .icon-fuwuzhongxin
          color #02a774
      .my_order_div
        border-bottom 1px solid #f1f1f1
        color #333
        display flex
        font-size 16px
        justify-content space-between
        padding 18px 10px 18px 0
        width 100%
        span
          display block
        .my_order_icon
          height 10px
          width 10px
          .icon-iconleft
            color #bbb
            font-size 10px
</style>