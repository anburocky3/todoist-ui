import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";
import LandingPage from "../components/marketing/LandingPage";
import AboutPage from "../components/marketing/About";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import Logout from "../components/auth/Logout";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage
  },
  { path: "/about", name: "about", component: AboutPage },
  {
    path: "/todos",
    name: "todos",
    meta: { requiresAuth: true },
    component: App
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresVisitor: true },
    component: LoginPage
  },
  {
    path: "/register",
    name: "register",
    meta: { requiresVisitor: true },
    component: RegisterPage
  },
  {
    path: "/logout",
    name: "logout",
    meta: { requiresAuth: true },
    component: Logout
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
});

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

export default router;
