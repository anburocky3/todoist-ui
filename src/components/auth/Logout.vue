<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("AUTH_LOGOUT")
    .then(() => {
      this.$router.push({ name: "login" });
    })
    .catch(() => { this.$router.push({ name: "login" }); });
  }
};
</script>