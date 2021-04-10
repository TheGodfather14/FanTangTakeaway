// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '../src/store';
import { Button } from 'mint-ui'
import "./mock/mockServer"
import VueLazyload from "vue-lazyload"
import loading from './common/imgs/loading.gif'
import './filters'

Vue.config.productionTip = false;
//在脚手架中使用element-ui
Vue.use(ElementUI);
Vue.component(Button.name, Button)
Vue.use(VueLazyload,{
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
