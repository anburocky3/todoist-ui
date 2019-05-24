<template>
  <div class>
    <div class="container">
      <div class="row my-4">
        <!-- <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h1 class="p-3">
                <img alt="Vue logo" class="img-fluid" src="./assets/logo.png" width="60">
                <strong style="color:#34495e">Vue Todo</strong>
              </h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse dicta atque, reiciendis sed ipsa nulla nesciunt. Et soluta saepe ex provident quia, sed praesentium voluptas, cumque deleniti autem voluptates? Quas.</p>
            </div>
          </div>
        </div>-->
        <div class="col-md-8 mx-auto">
          <todo-list></todo-list>
        </div>
      </div>
    </div>

    <!-- <Footer/> -->
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import Footer from "./components/layouts/Footer";

export default {
  name: "app",
  created() {
    // this.$store.dispatch("retrieveUser").then(response => {
    //   this.name = response.data.name;
    //   this.email = response.data.email;
    // });

  },
  data() {
    return {
      name: "",
      email: ""
    };
  },
  components: {
    TodoList,
    Footer
  }
};
</script>

<style>
</style>
