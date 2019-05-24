import axios from 'axios'

const state = {
  token: localStorage.getItem("access_token") || null,
  status: ""
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  }
};

const actions = {
  AUTH_REQUEST({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST");
      axios
        .post("/login", {
          email: user.email,
          password: user.pass
        })
        .then(res => {
          const token = res.data.success.token;
          localStorage.setItem("access_token", token);

          // Add the following line:
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("AUTH_SUCCESS", token);
          // context.commit("retrieveToken", token);

          // you have your token, now log in your user :)
          // dispatch("USER_REQUEST");
          resolve(res);
        })
        .catch(error => {
          commit("AUTH_ERROR", error);
          localStorage.removeItem("access_token");
          reject(error);
        });
    });
  },
  AUTH_LOGOUT({ commit, getters }) {
    if (getters.loggedIn) {
      // console.log(getters.loggedIn);

      return new Promise((resolve, reject) => {
        axios
          .post("/logout")
          .then(res => {
            localStorage.removeItem("access_token"); // clear your user's token from localstorage
            // context.commit("destroyToken");
            commit("AUTH_LOGOUT");
            delete axios.defaults.headers.common["Authorization"];

            resolve(res);
            // context.commit("addTodo", response.data);
          })
          .catch(error => {
            localStorage.removeItem("access_token");
            // context.commit("destroyToken");
            commit("AUTH_LOGOUT");
            reject(error);
          });
      });
    }
  }
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, token) {
    state.status = "success";
    state.token = token;
  },
  AUTH_ERROR(state) {
    state.status = "error";
  },
  AUTH_LOGOUT(state) {
    state.token = null;
    state.status = "logout";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
