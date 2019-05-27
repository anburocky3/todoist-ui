<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color:#2196f3">
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
              <router-link class="nav-link" :to="{ name: 'home' }" exact>
                {{ $t("menu.home") }}
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'about' }">{{ $t("menu.about") }}</router-link>
            </li>
            <li class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'todos' }">{{ $t("menu.todos") }}</router-link>
            </li>

            <li v-if="!loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'login' }">{{ $t("menu.login") }}</router-link>
            </li>

            <li v-if="!loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'register' }">{{ $t("menu.register") }}</router-link>
            </li>

            <li v-if="loggedIn" class="nav-item mr-4">
              <router-link class="nav-link" :to="{ name: 'logout' }">{{ $t("menu.logout") }}</router-link>
            </li>

            <li class="nav-item dropdown">
              <!-- <select
                v-model="locale"
                class="nav-item nav-link dropdown-toggle mr-md-2"
                id="bd-versions"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <option>en</option>
                <option>ta</option>
              </select>-->

              <a
                class="nav-item nav-link dropdown-toggle mr-md-2"
                href="#"
                id="bd-versions"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ $t("menu.languages") }}</a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                <a
                  class="dropdown-item"
                  v-for="(lang, i) in langs"
                  @click="changeLang(lang.code)"
                  :key="`Lang${i}`"
                  href="#"
                >{{ lang.name }}</a>
              </div>

              <!-- <div class="btn-group" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  class="btn btn-success dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >English</button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a class="dropdown-item" href="#">Tamil</a>
                </div>
              </div>-->
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
            </li>-->
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
  },
  data() {
    return {
      langs: [
        {
          code: "en",
          name: "English"
        },
        {
          code: "ta",
          name: "Tamil"
        }
      ]
    };
  },
  methods: {
    changeLang(lang) {
      localStorage.setItem("locale", lang);
      this.$i18n.locale = lang;
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
