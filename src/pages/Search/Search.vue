<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list">
      <ul class="list_container">
        <router-link
          :to="{ path: '/shop', query: { id: item.id } }"
          tag="li"
          v-for="item in searchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.month_sales || item.recent_order_num }} 单</p>
              <p>
                {{ item.delivery_fee || item.float_minimum_order_amount }}元起送
                / 距离 {{ item.distance }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！ 无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {
      emptyResult: false,
      imgBaseUrl: "http://cangdu.org:8001/img/",
      keyword: "",
    };
  },
  computed: {
    ...mapState(["searchShops"]),
  },
  methods: {
    search() {
      const keyword = this.keyword.trim();
      if (keyword) {
        this.emptyResult = false;
        this.$store.dispatch("searchShops", keyword);
      }
    },
  },
  watch: {
    searchShops(val) {
      if (!val.length) {
        this.emptyResult = true;
      }
    },
  },
  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.search
  height 100%
  overflow hidden
  width 100%
  .search_form
    clearFix()
    background-color #fff
    margin-top 45px
    padding 12px 8px
    input
      border-radius 2px
      font-weight bold
      height 35px
      outline none
      padding 0 4px
      &.search_input
        background-color #f2f2f2
        border 4px solid #f2f2f2
        color #333
        float left
        font-size 14px
        width 79%
      &.search_submit
        background-color #02a774
        border 4px solid #02a774
        color #fff
        float right
        font-size 16px
        width 18%
  .list
    .list_container
      background-color #fff
      .list_li
        border-bottom 1px solid $bc
        display flex
        justify-content center
        padding 10px
        .item_left
          margin-right 10px
          .restaurant_img
            display block
            height 50px
            width 50px
        .item_right
          flex 1
          font-size 12px
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    background-color #fff
    color #333
    margin 0 auto
    margin-top 0.125rem
    text-align center
</style>