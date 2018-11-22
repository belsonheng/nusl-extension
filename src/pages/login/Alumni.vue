<template>
  <form class="box" name="alumni" @submit.prevent="submit" @keyup.enter="submit">
    <label class="required" for="email">Email</label>
    <div class="field has-addons">
      <div class="control">
        <input class="input is-font-12px is-shadowless" name="email" type="text" placeholder="Your Email" v-model.trim="email">
      </div>
      <div class="control">
        <div class="dropdown is-hoverable is-right">
          <div class="dropdown-trigger">
            <button class="button is-dark is-shadowless" @click.prevent='' tabindex="-1">
              <span class="is-font-12px is-bold">{{ domain }}</span>
              <span class="icon is-small">
                <font-awesome-icon icon="caret-down"></font-awesome-icon>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" @click.prevent="domain='@u.nus.edu'">
                @u.nus.edu
              </a>
              <a class="dropdown-item" @click.prevent="domain='@alumni.nus.edu.sg'">
                @alumni.nus.edu.sg
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <label class="required" for="password">Password</label>
    <div class="field">
      <input class="input is-font-12px is-shadowless" name="password" type="password" placeholder="Your Password" v-model.trim="password">
    </div>
    <login-button :class="loading"></login-button>
    <flash-message class="step-1-down"></flash-message>
  </form>
</template>

<script>
  import loginButton from '../../components/buttons/Login.vue'
  import flashMessage from '../../components/notices/Flash.vue'

  import * as helpers from '../../helpers'
  import { mapActions } from 'vuex'

  export default {
    name: 'alumni',
    components: {
      loginButton,
      flashMessage
    },
    computed: {
      loading: function() {
        return { 'is-loading': this.isLoading }
      },
      user: function() {
        return this.email + this.domain
      }
    },
    data() {
      return {
        isLoading: false,
        email: '',
        domain: '@u.nus.edu',
        password: '',
      }
    },
    methods: {
      ...mapActions([
        'login',
        'flash'
      ]),
      submit: function() {
        this.flash({
          'message': null
        })
        if (!this.email || !this.password) {
          this.flash({
            'message': 'Invalid email or password',
            'timeout': 5000
          })
        } else {
          this.isLoading = true
          this.login({
            'username': this.user,
            'password': this.password
          })
          .catch(function(error) {
            this.flash({
              'message': 'Invalid email or password',
              'timeout': 5000
            })
          }.bind(this))
          .finally(() => {
            this.isLoading = false
          })
        }
      }
    },
    mounted() {
      document.querySelector("input[name='email']").focus()
    }
  }
</script>

<style lang="css">
  .dropdown-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .dropdown-content > .dropdown-item {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .dropdown .button {
    border: 1px;
  }

  .has-addons > .control:nth-child(1) {
    width: 100%;
  }
</style>
