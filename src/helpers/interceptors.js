import axios from "axios";
import { store } from "../store/store";

export default function setup() {
  // axios.interceptors.response.use(undefined, function(err) {
  //   return new Promise(function(resolve, reject) {
      
  //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //       this.$store.dispatch('destroyToken');
  //     }
  //     throw err;
  //   });
  // });
}
