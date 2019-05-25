import Vue from "vue";
import Master from "./components/layouts/Master";
import router from "./routers";
import store from "./store";
import VeeValidate from 'vee-validate';

// import interceptorsSetup from './helpers/interceptors'
// import axios from 'axios'
import VueI18n from 'vue-i18n'

import i18n from './i18n'


Vue.use(VeeValidate);
Vue.use(VueI18n)

// interceptorsSetup()
// console.log(router);


// const token = localStorage.getItem('access_token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

Vue.prototype.$appName = 'Todoist'

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: h => h(Master)
}).$mount("#app");
