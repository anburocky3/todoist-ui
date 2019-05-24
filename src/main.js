import Vue from "vue";
import Master from "./components/layouts/Master";
import router from "./routers";
import store from "./store";
import VeeValidate from 'vee-validate';
// import interceptorsSetup from './helpers/interceptors'
import axios from 'axios'

Vue.use(VeeValidate);

// interceptorsSetup()
// console.log(router);


const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$appName = 'Todoist'

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(Master)
}).$mount("#app");
