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
                  <h4 class="mb-4">Şifre Yenileme</h4>
                  <p>Şifre yenilemek için e-posta adresinize onay kodu gönderildi.</p>
                </div>

                <vs-input
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Onay Kodu"
                  v-model="verificationCode"
                  class="w-full mt-6"
                />

                <vs-input
                  type="password"
                  name="password"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Yeni Şifreniz"
                  v-model="password"
                  class="w-full mt-6"
                />

                <vs-input
                  type="password"
                  name="password"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Yeni Şifre Tekrar"
                  v-model="confirm_password"
                  class="w-full mt-6"
                />
                <div style="height: 25px;"></div>
                <vs-button
                  type="border"
                  to="/profile"
                  class="px-4 w-full md:w-auto"
                >Profil Sayfasına Dön</vs-button>

                <vs-button
                  @click="resetPassword"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                >Şifre Yenile</vs-button>
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
      password: "",
      confirm_password: "",
      verificationCode: ""
    };
  },
  methods: {
    resetPassword() {
      if (this.verificationCode.length < 4) {
        this.showError("Lütfen onay kodunu girin!");
        return;
      }

      if (this.password.trim().length < 6) {
        this.showError("Şifre minimum 6 karakterden oluşmalıdır!");
        return;
      }

      if (this.password != this.confirm_password) {
        this.showError("Şifreler uyuşmuyor!");
        return;
      }
      var email = JSON.parse(localStorage.getItem("userObject")).email;
      const payload = {
        email: email,
        password: this.password,
        verificationCode: this.verificationCode
      };
      this.$store.dispatch("auth/resetPassword", payload).then(response => {
        if (response) {
          this.verificationCode = "";
          this.password = "";
          this.confirm_password = "";
          this.$vs.dialog({
            color: this.colorAlert,
            title: "İşlem Başarılı",
            text: "Şifreniz başarıyla yenilendi.",
            accept: () => {
              this.$router.push("/profile").catch(() => {});
            },
            acceptText: "Uygulamaya Dön"
          });
        } else {
          this.$vs.notify({
            title: "Uyarı",
            text: "Oluşan bir hatadan dolayı şifre yenilenemedi!",
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
