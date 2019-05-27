<template>
  <div>
    <div class="col-md-4 m-5 mx-auto">
      <div class="card">
        <div class="card-header bg-theme">{{ greetUser }}</div>
        <div class="card-body">
          <div v-if="serverError" class="alert alert-danger" role="alert">
            <i class="fa fa-exclamation-circle pr-2"></i>
            {{ serverError }}
          </div>

          <div v-if="validationErrors" class="alert alert-danger" role="alert">
            <strong>Please correct the following errors:</strong>
            <ul v-for="(errors, index) in validationErrors" :key="index">
              <li>{{ errors[0] }}</li>
            </ul>
          </div>
          <form action="#" @submit.prevent="validateBeforeSubmit">
            <div class="form-row form-group">
              <div class="col">
                <label for="name">{{ $t("auth.fullName") }}</label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  aria-describedby="name"
                  placeholder="Your name"
                  v-model="name"
                  v-validate="'required|min:4'"
                  :class="{ 'is-invalid': errors.has('name') }"
                >
                <small class="invalid-feedback">{{ errors.first('name') }}</small>
              </div>
              <div class="col">
                <label for="email">{{ $t("auth.email") }}</label>
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
              </div>
            </div>

            <div class="form-group">
              <label for="password">{{ $t("auth.password") }}</label>
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                aria-describedby="email"
                placeholder="********"
                v-model="password"
                v-validate="'required|min:8'"
                ref="password"
                :class="{ 'is-invalid': errors.has('password') }"
              >
              <small class="invalid-feedback">{{ errors.first('password') }}</small>
            </div>
            <div class="form-group">
              <label for="cpassword">{{ $t("auth.confirmPassword") }}</label>
              <input
                v-validate="'required|confirmed:password'"
                type="password"
                class="form-control"
                name="cpassword"
                placeholder="********"
                v-model="cpassword"
                :class="{ 'is-invalid': errors.has('cpassword') }"
                data-vv-as="password"
              >
              <small class="invalid-feedback">{{ errors.first('cpassword') }}</small>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                :disabled="errors.any()"
              >{{ $t("auth.registerBtn") }}</button>
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
  name: "RegisterPage",
  components: {
    Footer
  },
  data() {
    return {
      name: "kamaraj",
      email: "kamaraj@gmail.com",
      password: "123456789",
      cpassword: "123456789",
      // name: "",
      // email: "",
      // password: "",
      // cpassword: "",
      validationErrors: "",
      serverError: "",
      successMessage: ""
    };
  },
  computed: {
    greetUser() {
      let name = this.name;
      return this.name.length <= 3
        ? this.$t("auth.register")
        : this.$t("greet.hello") + name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.register();
        }
      });
    },
    register() {
      this.$store
        .dispatch("registerUser", {
          name: this.name,
          email: this.email,
          password: this.password,
          cpassword: this.cpassword
        })
        .then(response => {
          this.successMessage = "Registered Successfully!";

          this.$router.push({
            name: "login",
            params: { dataSuccessMsg: this.successMessage }
          });
        })
        .catch(error => {
          if (!error.response) {
            this.serverError = "Error: Network Error";
          } else {
            this.validationErrors = Object.values(error.response.data.error);
          }
        });
    }
  }
};
</script>