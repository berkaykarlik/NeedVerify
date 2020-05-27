<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/3 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome to NeedVerify</p>
                </div>

                <div id="input-div">
                  <vs-input
                    data-vv-validate-on="blur"
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="E-Mail Address"
                    v-model="email"
                    class="w-full"
                  />

                  <div style="height: 15px;"></div>
                  <vs-input
                    data-vv-validate-on="blur"
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="NeedVerify Password"
                    v-model="password"
                    @keyup.enter="login"
                    class="w-full mt-6"
                  />

                  <div class="flex flex-wrap justify-between my-5">
                    <div></div>
                    <router-link to="/forgot-password">Forgot Password?</router-link>
                  </div>
                  <div class="flex flex-wrap justify-between mb-3" style="margin-top: 35px;">
                    <vs-button type="border" @click="registerUser">Register Page</vs-button>
                    <vs-button :disabled="!validateForm" @click="login">Login</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    validateForm() {
      return this.email.trim() != "" && this.password.trim() != "";
    }
  },
  methods: {
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: "Warning",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        return false;
      }
      return true;
    },
    login() {
      if (!this.checkLogin()) return;

      if (
        this.email.includes("@") == false ||
        this.email.includes(".") == false ||
        this.email.endsWith(".") ||
        this.email.startsWith("@") ||
        this.email.indexOf("@") + 1 == this.email.indexOf(".") ||
        this.email.length < 5
      ) {
        this.$vs.notify({
          title: "Warning!",
          text: "Wrong email format!",
          color: "warning",
          position: "top-right"
        });
        return;
      }

      // Loading
      this.$vs.loading();

      const payload = {
        userDetails: {
          email: this.email,
          password: this.password
        },
        notify: this.$vs.notify
      };

      this.$store
        .dispatch("auth/isEmailAvailable", this.email)
        .then(response => {
          if (response) {
            this.$store
              .dispatch("auth/login", payload)
              .then(() => {
                this.$vs.loading.close();
              })
              .catch(error => {
                this.$vs.loading.close();
                this.$vs.notify({
                  title: "Error",
                  text: error.message,
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              });
          } else {
            this.$vs.notify({
              title: "Warning",
              text: "Email not found!",
              color: "warning",
              position: "top-right"
            });
          }
          this.$vs.loading.close();
        });
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push("/register").catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
#input-div {
  margin-top: 60px;
}
</style>
