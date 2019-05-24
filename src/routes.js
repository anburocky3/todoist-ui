import App from "./App.vue";
import LandingPage from "./components/marketing/LandingPage";
import AboutPage from "./components/marketing/About";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Logout from "./components/auth/Logout";

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
  { path: "/logout", name: "logout", meta: { requiresAuth: true }, component: Logout }
];

export default routes;
