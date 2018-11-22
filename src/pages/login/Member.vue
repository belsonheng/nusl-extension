<template>
  <form class="box" name="member" @submit.prevent="submit">
    <label class="required" for="membership_number">Membership No.</label>
    <div class="field">
      <input class="input is-font-12px is-shadowless" name="membership_number" type="text" placeholder="Your Membership Number" v-model.trim="membership_number">
    </div>
    <label class="required" for="email">Registered Email</label>
    <div class="field">
      <input class="input is-font-12px is-shadowless" name="email" type="text" placeholder="Your Email" v-model.trim="email">
    </div>
    <login-button :class="loading"></login-button>
    <flash-message class="step-1-down"></flash-message>
  </form>
</template>

<script>
  import loginButton from '../../components/buttons/Login.vue'
  import flashMessage from '../../components/notices/Flash.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'member',
    components: {
      loginButton,
      flashMessage
    },
    computed: {
      loading: function() {
        return { 'is-loading': this.isLoading }
      }
    },
    data() {
      return {
        isLoading: false,
        membership_number: '',
        email: ''
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
        if (!this.membership_number || !this.email) {
          this.flash({
            'message': 'Invalid membership number or email',
            'timeout': 5000
          })
        } else {
          this.isLoading = true
          this.login({
            'username': this.membership_number,
            'password': this.email
          }).catch(function(error) {
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
      document.querySelector("input[name='membership_number']").focus()
    }
  }
</script>
