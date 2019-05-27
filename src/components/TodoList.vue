<template>
  <div class>
    <div class="card">
      <div class="card-body">
        <img
          src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
          class="img-fluid float-left"
          :alt="name"
          width="80"
        >
        <div style="padding-left:120px">
          <h3>{{ $t("user.welcomeUser", {userName: name}) }},</h3>
          <p class="text-muted">{{ $t("auth.email") }}: {{ email }}</p>
        </div>
      </div>
    </div>
    <ul class="nav nav-pills nav-fill my-3">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': this.$store.state.todo.filter == 'all'}"
          @click="$store.state.todo.filter = 'all'"
        >{{ $t("todos.filters.all") }}</a>
      </li>
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': this.$store.state.todo.filter == 'active'}"
          @click="$store.state.todo.filter = 'active'"
        >{{ $t("todos.filters.active") }}</a>
      </li>
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': this.$store.state.todo.filter == 'completed'}"
          @click="$store.state.todo.filter = 'completed'"
        >{{ $t("todos.filters.completed") }}</a>
      </li>
    </ul>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        aria-describedby="enterTodo"
        :placeholder="$t('todos.inputPlaceholder')"
        v-model="newTodo"
        @keypress.enter="addTodo"
      >
      <div class="input-group-append">
        <span class="input-group-text" id="enterTodo">
          <i class="fa fa-sign-in-alt"></i> &nbsp; Enter
        </span>
      </div>
    </div>
    <div v-if="todosFiltered.length > 0">
      <ul class="list-group">
        <transition-group
          name="fade"
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <todo-item
            v-for="(todo, index) in todosFiltered"
            :key="todo.id"
            :todo="todo"
            :index="index"
            :checkAll="!anyRemaining"
          ></todo-item>
        </transition-group>

        <li class="list-group-item">
          <div class="float-left">
            <input type="checkbox" name="checkAll" :checked="!anyRemaining" @change="checkAllTodos">
            <small class="text-muted">&nbsp; &nbsp; {{ $t("todos.helpers.checkAll") }}</small>
          </div>
          <div class="float-right">
            <transition name="fade">
              <button
                v-if="showClearCompletedBtn"
                @click="clearCompleted"
                class="btn btn-sm btn-info"
              >Clear Completed</button>
            </transition>
            <small
              class="text-muted pl-2"
            >{{ $t("todos.helpers.itemRemaining", { "item": remaining}) }}</small>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="text-center m-5">
      <h3>
        <i class="fa fa-tasks"></i>
        {{ $t('todos.404') }}
      </h3>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "todo-list",
  components: {
    TodoItem
  },
  data() {
    return {
      newTodo: "",
      name: "",
      email: ""
    };
  },
  created() {
    if (!this.name && !this.email) {
      this.$store.dispatch("retrieveUser").then(response => {
        this.name = response.data.name;
        this.email = response.data.email;
      });
    }

    this.$store.dispatch("retrieveTodos");
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      let value = this.newTodo;

      this.$store.dispatch("addTodo", {
        title: value.charAt(0).toUpperCase() + value.slice(1),
        completed: false
      });

      this.newTodo = "";
    },

    checkAllTodos() {
      this.$store.dispatch("checkAll", event.target.checked);
    },
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    }
  },
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedBtn() {
      return this.$store.getters.showClearCompletedBtn;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
