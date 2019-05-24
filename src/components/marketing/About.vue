<template>
  <div class>
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

    <Footer  :downloadBtn="true"/>
  </div>
</template>

<script>
import Footer from '../layouts/Footer'

export default {
  name: "about",
  components: {
    Footer
  }
  
};
</script>