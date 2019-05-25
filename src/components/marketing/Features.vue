<template>
  <div class>
    <section id="features" class="m-5">
      <div class="container">
        <div class="features-header text-center">
          <h2>{{ $t("features.featureHeadTitle", { appName: this.$appName }) }}</h2>
          <p>{{ $t("features.featureHeadDesc") }}</p>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-img p-5 text-center">
                <i class="fa fa-quote-left" style="font-size:40px;"></i>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h4>{{ $t("features.featureOne") }}</h4>
                  <p class="text-muted">{{ $t("features.featureOneDesc") }}</p>
                </div>
                <p>{{ $t("features.featureOneDetail", { appName: this.$appName }) }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-img p-5 text-center">
                <i class="fa fa-quote-left" style="font-size:40px;"></i>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h4>{{ $t("features.featureTwo") }}</h4>
                  <p class="text-muted">{{ $t("features.featureTwoDesc") }}</p>
                </div>
                <p>{{ $t("features.featureTwoDetail", { appName: this.$appName }) }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-img p-5 text-center">
                <i class="fa fa-quote-left" style="font-size:40px;"></i>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h4>{{ $t("features.featureThree") }}</h4>
                  <p class="text-muted">{{ $t("features.featureThreeDesc") }}</p>
                </div>
                <p>{{ $t("features.featureThreeDetail", { appName: this.$appName }) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: "features",
};
</script>