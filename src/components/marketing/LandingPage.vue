<template>
  <div>
    <section class="hero-slider">
      <div class="content-overlay">
        <h1 class="display-5 p-3">Finish your task in schedule!</h1>
        <p
          class="p-3"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus hic voluptas culpa eos vero ut?</p>
        <button class="btn btn-primary">Organise my todo</button>
      </div>
    </section>

    <section id="features" class="m-5">
      <div class="container">
        <div class="features-header text-center">
          <h2>{{ this.$appName }} Features</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-img p-5 text-center">
                <i class="fa fa-quote-left" style="font-size:40px;"></i>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h4>Priority-wise notes</h4>
                  <p class="text-muted">With smart turn</p>
                </div>
                <p>Busy? have somthing in mind? You can tell what to add, we will do the rest. Our {{ this.$appName }} will automatically Personialize and show what is needed based on the priority.</p>
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
                  <h4>Reminder notes</h4>
                  <p class="text-muted">With smart turn</p>
                </div>
                <p>Busy? have somthing in mind? You can tell what to add, we will do the rest. Our {{ this.$appName }} will automatically Personialize and show what is needed based on the priority.</p>
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
                  <h4>Password-Protected notes</h4>
                  <p class="text-muted">With smart turn</p>
                </div>
                <p>Busy? have somthing in mind? You can tell what to add, we will do the rest. Our {{ this.$appName }} will automatically Personialize and show what is needed based on the priority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer  :downloadBtn="true" />

  </div>
</template>

<script>
import Footer from '../layouts/Footer'

export default {
  name: "landing-page",
  components: {
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
