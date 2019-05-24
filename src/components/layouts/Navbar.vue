<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">{{ this.$appName }}</router-link>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item mr-4">
              <router-link class="nav-link"  :to="{ name: 'home' }" exact>
                Home
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'todos' }">Todos</router-link>
            </li>

            <li v-if="!loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
            </li>

            <li v-if="!loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
            </li>

            <li v-if="loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'logout' }">Logout</router-link>
            </li>

            <!-- <li class="nav-item dropdown mr-4">
              <router-link
                class="nav-link dropdown-toggle"
                to="#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Developers</router-link>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                <router-link class="dropdown-item" to="#">Github</router-link>
                <router-link class="dropdown-item" to="#">Facebook</router-link>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
