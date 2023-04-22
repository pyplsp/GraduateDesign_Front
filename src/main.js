import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/assets/AlibabaIcon/iconfont.css'


import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css'
import './theme/index.css'
import router from "./router";
import store from "@/store/store"
import _store from './utils/store';


Vue.prototype._store = _store;

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
  router,
  store
}).$mount('#app')
