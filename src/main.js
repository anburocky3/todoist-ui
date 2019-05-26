import Vue from "vue";
import Master from "./components/layouts/Master";
import router from "./routers";
import store from "./store";
import VeeValidate from 'vee-validate';

// import interceptorsSetup from './helpers/interceptors'
import axios from 'axios'

import i18n from './i18n'

Vue.use(VeeValidate);

// interceptorsSetup()
// console.log(router);


const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$appName = 'Todoist'

Vue.config.productionTip = false;

const locale = localStorage.getItem('locale');
if(locale){
  i18n.locale = locale;
}

new Vue({
  store,
  router,
  i18n,
  render: h => h(Master)
}).$mount("#app");
