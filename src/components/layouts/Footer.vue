<template>
  <div>
    <!-- Download the app section -->
    <section v-show="downloadBtn" id="appDownload" class="app-download">
      <div class="row">
        <div class="col-md-10">
          <h4>{{ $t("downloadBanner.title") }}</h4>
          <p>{{ $t("downloadBanner.desc") }}</p>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary">
            <i class="fa fa-download"></i>
            {{ $t("downloadBanner.btnText") }}
          </button>
        </div>
      </div>
    </section>

    <section id="footer" class="text-center bg-dark p-2">
      <p class="text-white" style="line-height:3" v-html="$t('footer.copyright')">
        <!-- {{ $t("footer.copyright") }} -->
        <i class="far fa-smile-wink"></i>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    downloadBtn: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-download {
  padding: 80px;
  background: #4caf50;
}

#footer > p {
  line-height: 2;
  margin: 0px;
}

#footer a {
  color: #00bcd4;
}
</style>
