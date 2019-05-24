<template>
  <div>
    <div class="col-md-4 mx-auto m-5">
      <div class="card">
        <div class="card-header bg-theme">Login</div>
        <div class="card-body">
          <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>

          <div v-if="serverError" class="alert alert-danger" role="alert">
            <i class="fa fa-exclamation-circle pr-2"></i>
            {{ serverError }}
          </div>

          <form action="#" @submit.prevent="validateBeforeSubmit">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                aria-describedby="email"
                placeholder="you@awesome.com"
                v-model="email"
                v-validate="'required|email'"
                :class="{ 'is-invalid': errors.has('email') }"
              >
              <small class="invalid-feedback">{{ errors.first('email') }}</small>

              <small
                v-show="!errors.first('email')"
                id="email"
                class="form-text text-muted"
              >Enter your authorized email account</small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="********"
                v-model="pass"
                v-validate="'required|min:6'"
                :class="{ 'is-invalid': errors.has('password') }"
              >
              <small class="invalid-feedback">{{ errors.first('password') }}</small>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" :disabled="errors.any()">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "../layouts/Footer";

export default {
  name: "LoginPage",
  components: {
    Footer
  },
  props: {
    dataSuccessMsg: {
      type: String
    }
  },
  data() {
    return {
      email: "anbuceo@gmail.com",
      pass: "123456789",
      // email: "adsa@adj.com",
      // pass: "26266",
      // email: "",
      // pass: "",
      successMessage: this.dataSuccessMsg,
      serverError: ""
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login();
        }
      });
    },
    login() {
      const { email, pass } = this
      this.$store
        .dispatch('AUTH_REQUEST', { email, pass })
        .then(() => {
          this.$router.push({ name: "todos" });
        })
        .catch(error => {
          // console.log(error)
          // if (!error.response) {
          //   console.log("Error: Network error");
          // }
          // else {
          //   console.log("Working");

          // }

          // this.serverError = error.response;
          if (!error.response) {
            this.serverError = "Error: Network Error";
          } else if (
            error.response.status == 401 &&
            error.response.data.error === "Unauthorised"
          ) {
            this.serverError = "Email or Password is invalid";
          } else {
            this.serverError = "Unknown error, contact us";
          }
        });

      //
    }
  }
};
</script>