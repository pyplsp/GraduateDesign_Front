import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css'
import './theme/index.css'
import router from "./router";

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: '1770IKmtSVz6gCU9HeAMt04G'
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
