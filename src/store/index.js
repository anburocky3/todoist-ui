import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import auth from "./modules/auth"
import todo from "./modules/todo"

import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.baseURL = "http://192.168.0.108:8000/api/";

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    auth,
    todo
  },
  strict: debug,
});
