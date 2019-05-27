<template>
  <div class="todo-item">
    <li class="list-group-item clsearfix mb-2">
      <div v-if="!editing" @dblclick="editTodo" :class="{ completed : completed }">
        <input type="checkbox" v-model="completed" @change="doneEdit" class="mr-2">
        {{ title }}
        <div class="float-right">
          <div class="text-muted" style="font-size:13px">
            <span class="mr-3">{{ todo.created_at | moment("h:mmA") }}</span>
            <button
              class="btn btn-sm btn-primary"
              data-toggle="collapse"
              :data-target="'#todoCollapse_' + todo.id"
              aria-expanded="true"
            >
              <i class="fa fa-caret-down"></i>
            </button>
          </div>
        </div>

        <div class="collapse todo-options" :id="'todoCollapse_' + todo.id">
          <hr>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="note">Note</label>
                <textarea
                  name="note"
                  id="note"
                  rows="7"
                  class="form-control resize"
                  placeholder="Notes, you want to save for this list."
                ></textarea>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for>Due date</label>
                <br>
                <date-picker
                  v-model="dueTime"
                  lang="en"
                  input-class="form-control"
                  format="DD-MM-YYYY"
                  valueType="date"
                  width="350"
                />

                <!-- <input type="text" class="form-control" value="03/06/1996"> -->
              </div>

              <!-- Priority -->
              <div class="form-group">
                <label for="priority">Priority</label>
                <select name="priority" id class="form-control">
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <!-- Delete button -->
              <div class="form-group">
                <button class="btn btn-danger btn-sm float-right" @click="removeTodo(todo.id)">
                  <i class="fa fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        v-else
        type="text"
        class="form-control"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      >
    </li>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "todo-item",
  components: {
    DatePicker
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: "",
      dueTime: Date()
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        return;
      }
      this.editing = false;

      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css);
.completed {
  text-decoration: line-through;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.todo-options {
  font-size: 15px;
}

.resize {
  resize: none;
}
</style>
