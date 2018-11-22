<template>
  <component :is="view" />
</template>

<script>
import login from './pages/login/Index.vue'
import dashboard from './pages/dashboard/Index.vue'

export default {
  name: 'app',
  components: {
    login,
    dashboard
  },
  computed: {
    isAuthorise: function() {
      return this.$store.state.auth.isAuthorise || false
    },
    accessToken: function() {
      return this.$store.state.auth.accessToken || ''
    },
    view: function() {
      return this.isAuthorise && this.accessToken ? 'dashboard' : 'login'
    }
  }
};
</script>

<style lang="css">
  @import url("./assets/css/normalize.css");
  @import url("./assets/css/bulma.min.css");
  @import url("./assets/css/animate.min.css");

  body {
    font-size: 14px;
    color: #031e52;
    font-weight: 500;
    background-color: #f1f3f7;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    height: 500px;
    width: 358px;
    overflow: hidden;
  }

  .sixty-forty {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: calc(500px - 55px);
    box-sizing: border-box;
    position: relative;
    background: linear-gradient(0deg, #1145ce 60%, #f1f3f7 40%);
  }

  form {
    overflow: auto;
    margin: 10px auto;
    padding: 20px;
    height: 300px;
    width: 85%;
  }

  .input {
    height: 3em;
    font-weight: 400;
    padding: 10px;
    border-color: #b5b5b5;
  }

  .field {
      margin-top: 5px !important;
      margin-bottom: 20px !important;
  }

  /* helpers */

  .is-font-12px {
    font-size: 12px !important;
  }

  .is-bold {
    font-weight: 700 !important;
  }

  .required:after {
    content: " *";
    color: #e32;
  }

  .step-1-down {
    margin-top: 1rem;
  }
</style>
