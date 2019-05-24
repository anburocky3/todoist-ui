import Vue from "vue";
import Master from "./components/layouts/Master";
import VueRouter from "vue-router";
import routes from "./routes";
import { store } from "./store/store";
import VeeValidate from 'vee-validate';
import interceptorsSetup from './helpers/interceptors'
import axios from 'axios'


window.eventBus = new Vue();
Vue.use(VueRouter);
Vue.use(VeeValidate);

// interceptorsSetup()

const token = localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$appName = 'Vueist'

Vue.config.productionTip = false;

const router = new VueRouter({ routes, mode: "history", linkActiveClass: "active" });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: "todos"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  store,
  router,
  render: h => h(Master)
}).$mount("#app");
