<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart/>
    </div>
    <food :food="food" ref="food"/>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
import CartControl from '../../../components/CartControl/CartControl';
import Food from '../../../components/Food/Food';
import ShopCart from '../../../components/ShopCart/ShopCart';

export default {
  components: { CartControl,Food,ShopCart,},
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标（活动过程实时变化）
      tops: [], //所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
      food: {}, //需要显示的food
    };
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    //计算当前分类的下标
    currentIndex() {
      //初始执行  相关数据发生变化
      //得到条件数据
      const { scrollY, tops } = this;
      //根据条件计算
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      //返回
      return index;
    },
  },
  methods: {
    //初始化滚动条
    _initScroll() {
      //列表数据更新显示后执行
      // 列表显示之后创建
      new BScroll(".menu-wrapper", {
        click: true,
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, //因为惯性滑动不会触发
        click: true,
      });
      //给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      //给右侧列表绑定scroll结束的监听
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      //找到所有分类的ui
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    clickMenuItem(index) {
      //右侧列表滑动到对应的位置
      //得到目标位置的ScrollY
      const scrollY = this.tops[index];
      //立即更新
      this.scrollY = scrollY;
      //平滑滚动右侧列表
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
    //显示点击的food
    showFood(food) {
      //设置food
      this.food = food;
      //显示food组件(调用子组件对象的方法)
      this.$refs.food.toggleShow();
    },
  },

};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  background #fff
  bottom 46px
  display flex
  overflow hidden
  position absolute
  top 195px
  width 100%
  .menu-wrapper
    background #f3f5f7
    flex 0 0 80px
    width 80px
    .menu-item
      display table
      height 54px
      line-height 14px
      padding 0 12px
      width 56px
      &.current
        background #fff
        color $green
        font-weight 700
        margin-top -1px
        position relative
        z-index 10
        .text
          border-none()
      .icon
        background-repeat no-repeat
        background-size 12px 12px
        display inline-block
        height 12px
        margin-right 2px
        vertical-align top
        width 12px
      .text
        display table-cell
        vertical-align middle
        width 56px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      background #f3f5f7
      border-left 2px solid #d9dde1
      color rgb(147, 153, 159)
      font-size 12px
      height 26px
      line-height 26px
      padding-left 14px
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          color rgb(7, 17, 27)
          font-size 14px
          height 14px
          line-height 14px
          margin 2px 0 8px 0
        .desc, .extra
          color rgb(147, 153, 159)
          font-size 10px
          line-height 10px
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            color rgb(240, 20, 20)
            font-size 14px
            margin-right 8px
          .old
            color rgb(147, 153, 159)
            font-size 10px
            text-decoration line-through
        .cartcontrol-wrapper
          bottom 12px
          position absolute
          right 0
</style>
