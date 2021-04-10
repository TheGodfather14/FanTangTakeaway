<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <router-link class="header_search" slot="left" to="search">
        <i class="iconfont icon-linedesign-12"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userInfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-lianxiaolianmanyi-"></i></span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-icon--copy"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import ShopList from "../../components/ShopList/ShopList";

export default {
  name: "Msite",
  data() {
    return {
      baseImgUrl: "https://fuss10.elemecdn.com",
    };
  },
  mounted() {
    this.$store.dispatch("getFoodCategorys");
    this.$store.dispatch("getShops");
  },
  watch: {
    categorys(value) {//有数据 再异步更新之前
    this.$nextTick(()=>{//一旦完成界面更新 立刻调用  写在数据更新之后
      //创建swiper对象进行轮播   考虑出现的时机
      new Swiper(".swiper-container", {
        loop: true, //循环轮播
        //需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    })
      
    },
  },
  components: { HeaderTop, Swiper, ShopList },
  computed: {
    ...mapState(["address", "categorys","userInfo"]),
    //根据categorys一维数组 生成二维数组   小数组元素虽多为8个
    categorysArr() {
      const { categorys } = this;
      const arr = [];
      let minArr = [];
      //遍历
      categorys.forEach((c) => {
        //minArr空 进入arr‘占位’  c进入minArr进行填充 到8个 清空minArr为0 再占位
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(c);
      });
      return arr;
    },
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    background #fff
    height 200px
    margin-top 45px
    .swiper-container
      height 100%
      width 100%
      .swiper-wrapper
        height 100%
        width 100%
        .swiper-slide
          align-items flex-start
          display flex
          flex-wrap wrap
          justify-content center
          .link_to_food
            width 25%
            .food_container
              display block
              font-size 0
              padding-bottom 10px
              text-align center
              width 100%
              img
                display inline-block
                height 50px
                width 50px
            span
              color #666
              display block
              font-size 13px
              text-align center
              width 100%
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    background #fff
    margin-top 10px
    .shop_header
      padding 10px 10px 0
      .shop_icon
        color #999
        margin-left 5px
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>