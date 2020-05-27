<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Forgot Password</h4>
                  <p>A confirmation code will be sent to your e-mail address. You can set a new password with this confirmation code.</p>
                </div>

                <vs-input
                  v-if="!verficationCodeSent"
                  type="email"
                  label-placeholder="Email"
                  v-model="email"
                  class="w-full mb-8"
                />

                <vs-input
                  v-if="verficationCodeSent"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Confirmation code"
                  v-model="verficationCode"
                  class="w-full mt-6"
                />

                <vs-input
                  v-if="verficationCodeSent"
                  type="password"
                  name="password"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="New Password"
                  v-model="password"
                  class="w-full mt-6"
                />

                <div style="height: 25px;"></div>
                <vs-button
                  type="border"
                  to="/login"
                  class="px-4 w-full md:w-auto"
                >Login Page</vs-button>

                <vs-button
                  v-if="!verficationCodeSent"
                  @click="sendVerificaitonCode"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                >Send Confirmation Code</vs-button>

                <vs-button
                  v-if="verficationCodeSent"
                  @click="resetPassword"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                >Reset Password</vs-button>
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
      verficationCodeSent: false,
      password: "",
      verficationCode: ""
    };
  },
  methods: {
    sendVerificaitonCode() {
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
      this.$store
        .dispatch("auth/isEmailAvailable", this.email)
        .then(response => {
          if (response) {
            this.$store.dispatch("auth/sendResetPasswordCode", this.email);
            this.verficationCodeSent = true;
          } else {
            this.$vs.notify({
              title: "Warning",
              text: "Email address not found!",
              color: "warning",
              position: "top-right"
            });
          }
        });
    },
    resetPassword() {
      if (this.verficationCode.length < 4) {
        this.showError("Please enter confirmation code!");
        return;
      }

      if (this.password.trim().length < 6) {
        this.showError("Password must have a minimum of 6 characters!");
        return;
      }

      const payload = {
        email: this.email,
        password: this.password,
        verificationCode: this.verficationCode
      };
      this.$store.dispatch("auth/resetPassword", payload).then(response => {
        if (response) {
          this.password = "";
          this.verficationCode = "";
          this.$vs.dialog({
            color: this.colorAlert,
            title: "Successful!",
            text:
              "Your account password has been successfully renewed. You can continue using the application by logging in with your new password.",
            accept: () => {
              this.$router.push("/login").catch(() => {});
            },
            acceptText: "Login"
          });
        } else {
          this.$vs.notify({
            title: "Warning",
            text: "The password could not be renewed. Please make sure to enter the last confirmation code sent to your e-mail address.",
            color: "danger",
            position: "top-right"
          });
        }
      });
    },
    showError(errorMessage) {
      this.$vs.notify({
        title: "Hata!",
        text: errorMessage,
        color: "danger",
        position: "top-right"
      });
    }
  }
};
</script>
