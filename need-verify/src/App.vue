<!-- =========================================================================================
  File Name: App.vue
  Description: Main vue file - APP
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";

export default {
  data() {
    return {
      vueAppClasses: []
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },
  methods: {
    toggleClassInBody(className) {
      if (className === "dark") {
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
        document.body.classList.add("theme-dark");
      } else if (className === "semi-dark") {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr);
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

      // Set --vh property
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);

    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    
  },
  async created() {
    // jwt
    jwt.init();

    const dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);

    // Auth0
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style >

  /* alert'lerin başlığı biraz daha büyük görünsün */
  .vs-alert--title{
    font-size: 1rem !important;
  }

  /* tab'lar için renklendirme */
  .vs-tabs .activeChild{
    background: linear-gradient(118deg, rgba(var(--vs-primary), 0.9), rgba(var(--vs-primary), 0.60)) !important;
    color: white !important;
    border-radius: 8px !important;
    box-shadow: 0px 0px 6px 1px rgba(var(--vs-primary), 0.6) !important;
  }
  .vs-tabs-position-top .vs-tabs--ul{
    padding: 5px !important;
  }
  .vs-tabs .con-ul-tabs button{
    padding: 8px 14px !important;
  }

  .vs-tabs-primary .con-ul-tabs .activeChild button span{
  color: white !important;
  }

  .line-vs-tabs{
    display: none !important;
  }

  /* tab content'in kenar boşluğu üretmemesi için */
  .con-tab .vs-tabs--content{
    padding: 10px 0px !important;
  }

  /* table'lar için gölgeli kenar */
  .vs-con-table {
    margin: 4px !important;
    box-shadow: 1px 1px 3px 3px #f0f5f5 !important;
  }

  /* menü iconlarının kaldırılması */
  .menu-item .h-nav-menu-item .select-none {
    display: none;
  }
  .vs-sidebar--item .select-none {
    display: none;
  }
  .v-nav-menu .navigation-header {
    color: #bbbbbb;
    font-weight: 600;
  }

  .menu-link .h-nav-menu-item a {
    padding: 0.4rem 1.2rem !important;
  }

  /* Number Input'un manuel değiştirilebilmesini önlemek için */
  .vs-input-number input{
    pointer-events: none;
  }

  /* üst menünün yüksekliğini daraltmak için */
  .menu-link .h-nav-menu-item{
    padding: 10px 2px !important;
  }
  
  .nav-header .header-label {
    padding: 6px 10px !important;
  }

  .truncate {
    font-size: 15px !important;
  }

  .nav-header {
    font-size: 15px !important;
  }

  .v-nav-menu .vs-sidebar--item a {
    padding: 8px 15px !important;
  }
  .v-nav-menu .scroll-area-v-nav-menu > .vs-sidebar--item {
    padding: 5px 15px !important;
  }
  .v-nav-menu .navigation-header {
    margin-top: 1.2rem !important;
    margin-bottom: 0px !important;
  }

  .vs__selected {
    padding: 0px 10px !important;
    border: 1px solid rgba(141, 141, 141, 0.26);
    border-radius: 7px !important;
    background-color: #e0f7f5 !important;
    color: E5F7F5;
  }

  th .sort-th i {
    font-size: 1rem !important;
    margin: -1px -1px;
  }

  @media only screen and (max-width: 1400px) {
    .vx-card .vx-card__collapsible-content .vx-card__body {
      padding: 1rem !important;
    }
  }
  @media only screen and (max-width: 1040px) {
    .vx-card .vx-card__collapsible-content .vx-card__body {
      padding: 0.6rem !important;
    }
  }
  @media only screen and (max-width: 720px) {
    .vx-card .vx-card__collapsible-content .vx-card__body {
      padding: 0.2rem !important;
    }
  }

  .v-nav-menu .scroll-area-v-nav-menu > .vs-sidebar--item {
    padding: 0px 6px !important;
  }

  /* Mobil görünümde yan menünün alt kısmında boşluk oluşması için */
  .v-nav-menu .scroll-area-v-nav-menu{
    padding-bottom: 30px !important;
  }
</style>
