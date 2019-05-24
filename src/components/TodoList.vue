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
          <h3>Welcome {{ name }},</h3>
          <p class="text-muted">Email: {{ email }}</p>
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
        >
          All
        </a>
      </li>
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': this.$store.state.todo.filter == 'active'}"
          @click="$store.state.todo.filter = 'active'"
        >Active</a>
      </li>
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          :class="{ 'active': this.$store.state.todo.filter == 'completed'}"
          @click="$store.state.todo.filter = 'completed'"
        >Completed</a>
      </li>
    </ul>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your Todo List"
        v-model="newTodo"
        @keypress.enter="addTodo"
      >
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
            <small class="text-muted">&nbsp; &nbsp;Check All</small>
          </div>
          <div class="float-right">
            <transition name="fade">
              <button
                v-if="showClearCompletedBtn"
                @click="clearCompleted"
                class="btn btn-sm btn-info"
              >Clear Completed</button>
            </transition>
            <small class="text-muted pl-2">{{ remaining }} Items remaining</small>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="text-center m-5">
      <h3>
        <i class="fa fa-tasks"></i> Nothing here. Create one.
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
      //validate
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
