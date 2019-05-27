/* eslint-disable no-console */
import axios from "axios";

const state = {
  filter: "all",
  todos: []
};

const getters = {
  remaining(state) {
    // if (state.todos.length < 0) {
      return state.todos.filter(todo => !todo.completed).length;
    // }
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
};

const actions = {
  CLEAR_TODOS({ commit }) {
    commit("CLEAR_TODOS");
  },
  retrieveTodos({ commit, rootState }) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + rootState.auth.token;
    axios
      .get("/todos")
      .then(response => {
        commit("retrieveTodos", response.data);
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
      .then(() => {
        context.commit("deleteTodo", id);
      })
      .then(error => {
        console.log(error);
      });
  },
  checkAll(context, checked) {
    axios
      .patch("/todosCheckAll", { completed: checked })
      .then(() => {
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
      .then(() => {
        context.commit("clearCompleted");
      })
      .then(error => {
        console.log(error);
      });
  }
};

const mutations = {
  CLEAR_TODOS(state) {
    state.todos = [];    
  },
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
