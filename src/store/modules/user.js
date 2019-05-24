import axios from "axios";

const state = {};

const getters = {};

const actions = {
  retrieveUser({state, commit, rootState}) {    
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + rootState.auth.token;

    return new Promise((resolve, reject) => {
      axios
        .get("/user")
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUser(context, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("/register", {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          c_password: credentials.cpassword
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
