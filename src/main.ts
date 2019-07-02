import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
// import Antd from 'ant-design-vue'
import './registerServiceWorker';
import '@/style/index.less';
import Share from 'vue-social-share'
// vue-antdesign 按需加载
import '@/core/user'
import VueLazyload from 'vue-lazyload'
import './permission'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

// import moment from 'moment';
// import 'moment/locale/zh-cn';

// moment.locale('zh-cn');

Vue.config.productionTip = false;
// Vue.use(Antd)

Vue.use(VueLazyload)
Vue.use(Share)
Vue.use(preview)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
