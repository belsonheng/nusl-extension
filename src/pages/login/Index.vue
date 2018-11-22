<template>
  <div id="app">
    <header>
      <titlebar message="Version 0.3.0"></titlebar>
      <navbar>
        <div class="level-item" :class="isActive('alumni')" @click="toggle('alumni')">NUS Alumni</div>
        <div class="level-item" :class="isActive('member')" @click="toggle('member')">External Member</div>
      </navbar>
    </header>
    <section class="sixty-forty">
      <logo />
      <component :is="view"></component>
    </section>
    <modal name="aup" width="90%" height="90%" :draggable="true" :clickToClose="false">
      <div class="container" style="padding: 1em;">
        <div class="is-bold has-text-centered nus-blue">Acceptable Use of NUS Libraries E-Resources</div>
        <scrollbar class="aup">
          <p class="is-bold nus-orange">Eligibility and Purpose of Use</p>
          <p>
            Only NUS students, faculty, staff and other authorised users may access NUS Libraries subscribed
            e-resources for non-commercial, educational, scholarly and research purposes.
          </p>
          <p class="is-bold nus-orange">Usage</p>
          <p>
            The e-resources subscribed by NUS Libraries belong to third-party content providers such
            as publishers and vendors. Their usage is governed by:
          <ul>
            <li>license agreements negotiated between NUS Libraries and the content providers</li>
            <li>Singapore Copyright Act</li>
          </ul>
          <p>
            Excessive downloading as well as sharing, copying and making accessible the licensed
            e-resources to non-NUS parties are therefore strictly prohibited. Such actions may
            jeopardise the entire NUS community's continued access to the e-resources.
          </p>
          <p class="is-bold nus-orange">Massive Search Instructions and Data Download</p>
          <p>
            Users shall not indiscriminately issue search instructions and download data manually or
            via automated intelligent agents that may potentially consume large amount of network/Internet
            bandwidth and IT Resources, or which may degrade the network, system and/or database performance.
          </p>
          <p class="is-bold nus-orange">NUS IT Acceptable Use Policy for IT Resources</p>
          <p>
            Users must also comply with
            <a href="https://nusit.nus.edu.sg/services/it_security/acceptable-use-policy-aup/">
              NUS IT Acceptable Use Policy for IT Resources
            </a>.
          </p>
        </scrollbar>
        <div class="button is-primary is-rounded" @click="consent">I Agree</div>
      </div>
    </modal>
  </div>
</template>

<script>
  import scrollbar from 'vue-perfect-scrollbar'
  import titlebar from '../../components/TitleBar.vue'
  import navbar from '../../components/NavBar.vue'
  import logo from '../../components/Logo.vue'
  import alumni from './Alumni.vue'
  import member from './Member.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'login',
    components: {
      scrollbar,
      titlebar,
      navbar,
      logo,
      alumni,
      member
    },
    computed: {
      view: function() {
        return this.current
      }
    },
    data() {
      return {
        current: 'alumni'
      }
    },
    methods: {
      ...mapActions([
        'flash'
      ]),
      toggle: function(component) {
        this.current = component
        if (this.$store.state.flash.message !== null) {
          this.flash({
            'message': null
          })
        }
      },
      isActive: function(component) {
        return {
          active: this.current === component
        }
      },
      consent: function() {
        this.$modal.hide('aup')
        document.querySelector("input[name='email']").focus()
      }
    },
    mounted() {
      document.querySelector("#app > header").classList.add("animated", "slideInDown")
      document.querySelector(".sixty-forty").classList.add("animated", "slideInUp")
      this.$modal.show('aup')
      //check if tab exists if not open new tab
      // chrome.tabs.query({'url': 'http://cjn3.stf.nus.edu.sg:3000/aup.html'}, function(tabs) {
      //   if (tabs.length <= 0) {
          //alert('please visit AUP')
          //chrome.tabs.update(tabs[0].id, {'active': true})
      //   }
      // })
    }
  }
</script>

<style lang="css">
  .aup {
    font-size: 11px;
    margin-bottom: 10px;
    text-align: justify;
    height: 350px;
  }

  .aup p, .aup li {
    padding-top: 5px;
  }

  .aup ul {
    padding: 0.7em;
    text-align: left;
    list-style: inside;
  }

  .container {
    text-align: center;
  }

  .container .button {
    cursor: pointer;
    width: 120px;
  }

  .nus-blue {
    color: #003D7C;
  }

  .nus-orange {
    color: #EF7C00;
  }
</style>
