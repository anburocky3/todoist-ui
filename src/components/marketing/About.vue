<template>
  <div class>

    <Features />

    <Footer  :downloadBtn="true"/>
  </div>
</template>

<script>
import Footer from '../layouts/Footer'
import Features from "./Features"

export default {
  name: "about",
  components: {
    Features,
    Footer
  }
  
};
</script>