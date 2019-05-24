<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import axios from "axios";
import { store } from "../../store/store";

export default {
  components: {
    Navbar
  },
  created() {
    // Add a response interceptor
    // axios.interceptors.response.use(
    //   function(res) {
    //     // Do something with response data
    //     // console.log("Response loading");
    //     // console.log(res);

    //     // if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    //     //   console.log("Network error");
    //     //   this.$store.dispatch(AUTH_LOGOUT);
    //     // } else {
    //     //   console.log(err);
    //     // }
    //     // console.log(response);

    //     return res;
    //   },
    //   function(err) {

    //     return new Promise(function(resolve, reject) {
    //       if (
    //         err.status === 401 &&
    //         err.config &&
    //         !err.config.__isRetryRequest
    //       ) {
    //         // if you ever get an unauthorized, logout the user
    //         this.$store.dispatch(AUTH_LOGOUT);
    //         // you can also redirect to /login if needed !
    //       }
    //       throw err;
    //     });
    //     // Do something with response error
    //     console.log("Response error");

    //     console.log(err.status);

    //     // if (err.status === 401 && res.config && !res.config.__isRetryRequest) {
    //     //   console.log("Network error");
    //     //   this.$store.dispatch(AUTH_LOGOUT);
    //     // } else {
    //     //   console.log(err);
    //     // }

    //     // store
    //     //   .dispatch("AUTH_LOGOUT")
    //     //   .then(() => {
    //     //     this.$router.push({ name: "login" });
    //     //   })
    //     //   .catch(() => {
    //     //     this.$router.push({ name: "login" });
    //     //   });

    //     // return Promise.reject(error.response);
    //   }
    // );

    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        // console.log("Master loading");
        // console.log(err);
        // if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        if (true) {
          // if you ever get an unauthorized, logout the user
          // store
          //   .dispatch("AUTH_LOGOUT")
          //   .then(() => {
          //     this.$router.push({ name: "login" });
          //   })
          //   .catch(() => {
          //     this.$router.push({ name: "login" });
          //   });
          // you can also redirect to /login if needed !
          // console.log("Inside block");
        }
        throw err;
        // if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // // if (true) {
        //   // if you ever get an unauthorized, logout the user
        //   this.$store.dispatch('AUTH_LOGOUT');

        //   // you can also redirect to /login if needed !
        // // console.log("Inside block");
        // }
        // throw err;
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
