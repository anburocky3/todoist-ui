/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// axios.defaults.baseURL = "http://192.168.0.108:8000/api/";

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (!error.response) {
//       console.log("Please check your internet connection.");
//       // this.serverError = "Error: Network Error";
//     }

//     return Promise.reject(error);
//   }
// );

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    filter: "all",
    todos: [],
    status: ""
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompletedBtn(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    retrieveTodos(state, todos) {
      state.todos = todos;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
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
  },
  actions: {
    retrieveUser(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

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
    },
    destroyToken(context) {
      // axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.token;
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/logout")
            .then(res => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");

              resolve(res);
              // context.commit("addTodo", response.data);
            })
            .then(error => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },
    AUTH_REQUEST({ commit, dispatch }, user) {
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
    AUTH_LOGOUT({ commit, getters, dispatch }) {
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
    },
    retrieveTodos(context) {
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + context.state.token;
      axios
        .get("/todos")
        .then(response => {
          console.log("response")
          context.commit("retrieveTodos", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addTodo(context, todo) {
      axios
        .post("/todos", { title: todo.title, completed: todo.completed })
        .then(response => {
          context.commit("addTodo", response.data);
        })
        .then(error => {
          console.log(error);
        });
    },
    updateTodo(context, todo) {
      axios
        .patch("/todos/" + todo.id, {
          title: todo.title,
          completed: todo.completed
        })
        .then(response => {
          context.commit("updateTodo", response.data);
        })
        .then(error => {
          console.log(error);
        });
    },
    deleteTodo(context, id) {
      axios
        .delete("/todos/" + id)
        .then(response => {
          context.commit("deleteTodo", id);
        })
        .then(error => {
          console.log(error);
        });
    },
    checkAll(context, checked) {
      axios
        .patch("/todosCheckAll", { completed: checked })
        .then(response => {
          context.commit("checkAll", checked);
        })
        .then(error => {
          console.log(error);
        });
    },
    clearCompleted(context) {
      const completed = context.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);

      axios
        .delete("/todosDeleteAll", { data: { todos: completed } })
        .then(response => {
          context.commit("clearCompleted");
        })
        .then(error => {
          console.log(error);
        });
    }
  }
});
