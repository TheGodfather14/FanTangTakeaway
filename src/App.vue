<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import FooterGuide from "./components/FooterGuide/FooterGuide";

export default {
  name: "App",
  // created() {
  //   this.$store.dispatch("getAddressProvince");
  // },
  mounted() {
    this.getAddress(),
    this.getUserInfo()
    
  },
  components: {
    FooterGuide,
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  background #f5f5f5
  height 100%
  width 100%
</style>