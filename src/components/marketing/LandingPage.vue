<template>
  <div>
    <section class="hero-slider">
      <div class="content-overlay">
        <h1 class="display-5 p-3">{{ $t("site.landingHeadTitle") }}</h1>
        <p class="p-3">{{ $t("site.landingHeadDesc") }}</p>
        <button class="btn btn-primary">{{ $t("site.landingHeadTitle") }}</button>
      </div>
    </section>

    <Features/>

    <Footer :downloadBtn="true"/>
  </div>
</template>

<script>
import Footer from "../layouts/Footer";
import Features from "./Features"

export default {
  name: "landing-page",
  components: {
    Features,
    Footer
  }
};
</script>

<style scoped>
.hero-slider {
  margin-top: -60px;
  min-height: 545px;
  background: url(http://www.awerest.com/demo/myway/img/intro-bg.jpg) no-repeat
    fixed;
  /* background-repeat: no-repeat; */
  background-size: cover;
  /* background-color: rgba(0, 0, 0, .8); */
}

.content-overlay {
  min-height: 545px;
  background: rgba(0, 0, 0, 0.5);
  padding: 50px;
  padding-top: 200px;
  text-align: center;
  color: #fff;
}
</style>
