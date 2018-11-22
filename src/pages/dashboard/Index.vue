<template>
  <div v-if="spinner.status && !spinner.overlay" id="app" class="dashboard pageloader animated fadeIn">
    <spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed">
    </spinner>
  </div>
  <div v-else id="app" class="dashboard">
    <div v-if="spinner.status && spinner.overlay" class="pageloader overlay">
      <spinner
        :status="spinner.status"
        :color="spinner.color"
        :size="spinner.size"
        :depth="spinner.depth"
        :rotation="spinner.rotation"
        :speed="spinner.speed">
      </spinner>
    </div>
    <header class="animated slideInDown faster">
      <titlebar message="Time Remaining"></titlebar>
      <countdown class="has-text-centered" :end="timeout" showHours showMinutes showSeconds></countdown>
    </header>
    <section v-if="!resources" class="main has-no-items has-text-centered animated slideInLeft faster">
      No items are currently available
    </section>
    <div v-else class="full-height">
      <div class="control filter has-icons-right">
        <input class="input is-font-12px is-shadowless" placeholder="Filter by name" type="text" v-model.trim="filter" autofocus>
        <span class="icon is-small is-right">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </span>
      </div>
      <scrollbar class="main">
        <div v-for="resource in getResources" class="card">
          <header class="card-header">
            <div class="card-header-title">
              <span class="name" title="Open in a new tab" @click="proxy(resource.id)">
                {{ resource.name }}
              </span>
            </div>
            <div class="card-header-icon">
              <span class="icon" title="View more information" @click="more(resource.id)">
                <font-awesome-icon class="more" icon="info-circle" size="lg"></font-awesome-icon>
              </span>
            </div>
          </header>
        </div>
      </scrollbar>
    </div>
    <footer>
      <logout-button @click.native="submit"></logout-button>
    </footer>
  </div>
</template>

<script>
  import spinner from '../../components/notices/Loading.vue'
  import titlebar from '../../components/TitleBar.vue'
  import logoutButton from '../../components/buttons/Logout.vue'

  import countdown from 'countdown-vue'
  import scrollbar from 'vue-perfect-scrollbar'

  import resourceAPI from '../../services/api/resource'
  import * as helpers from '../../helpers'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'dashboard',
    components: {
      spinner,
      titlebar,
      countdown,
      scrollbar,
      'logout-button': logoutButton
    },
    computed: {
      ...mapGetters([
        'getAccessToken'
      ]),
      getResources() {
        var resources = this.resources.filter((resource) => {
          return resource.name.toLowerCase().includes(this.filter.toLowerCase())
        })
        return resources.sort(function(a, b) {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
      }
    },
    data() {
      return {
        filter: '',
        resources: null,
        timeout: new Date().toString(),
        spinner: {
          overlay: false,
          size: 50,
          status: true,
          color: '#0c16b3',
          depth: 3,
          rotation: true,
          speed: 0.8,
        }
      }
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      more: function(detail_id) {
        window.open(`https://libguides.nus.edu.sg/eresources_onsite#${detail_id}`, '_blank')
      },
      proxy: function(resource_id) {
        this.spinner.status = true
        this.spinner.overlay = true
        resourceAPI.fetch(resource_id)
        .then(function(session_url) {
          window.open(session_url, '_blank')
        })
        .finally(() => {
          this.spinner.status = false
          this.spinner.overlay = false
        })
      },
      submit: function() {
        if (confirm("Are you sure you would like to logout?")) {
          chrome.alarms.clearAll()
          chrome.extension.getBackgroundPage().clearBrowsingData()
          this.logout()
        }
      }
    },
    mounted() {
      if (!helpers.isTokenExpired(this.getAccessToken)) {
        let expiry = helpers.getTokenExpiryInSeconds(this.getAccessToken) * 1000
        this.timeout = new Date(expiry).toString()
        resourceAPI.getResources()
        .then(function(data) {
          this.resources = data.length === 0 ? null : data
          setTimeout(() => {
            var cards = document.querySelectorAll(".card"), i, delay = 0.15
            for (i = 0; i < cards.length; ++i) {
              cards[i].classList.add("animated", "slideInLeft", "fast")
              cards[i].style["animation-delay"] = delay + 's'
              delay += 0.15
            }
          }, 0)
        }.bind(this))
        .catch(() => {
          this.logout()
        })
        .finally(() => {
          this.spinner.status = false
          chrome.extension.getBackgroundPage().setNotification(expiry)
          chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.message === "logout") {
              this.logout()
              sendResponse({ message: "ok" })
            }
          }.bind(this))
        })
      } else {
        this.logout()
      }
    }
  }
</script>

<style lang="css">
  .dashboard {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  .pageloader {
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }

  .overlay {
    display: flex;
    position: fixed;
    padding-bottom: 10%;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 358px;
    z-index: 99999;
    background-color: rgba(255, 255, 255, 0.7)!important;
  }

  .dashboard .main {
    flex-grow: 1;
    margin-top: 10px;
    height: 310px;
  }

  .dashboard .filter {
    margin-top: 10px;
    margin-left: 1.1em;
    width: 90%;
  }

  .full-height {
    width: 100%;
  }

  .has-no-items {
    margin-top: 7rem !important;
  }

  .card {
    border-left: 5px solid #1145ce;
    margin-bottom: 2px;
  }

  .card-header-title > .name, .card-header-icon > .icon {
    cursor: pointer;
  }

  .card-header-title > .name:hover {
    color: #1145ce !important;
    // transition: border-width 0.1s linear;
    // border-width: 0.8rem;
  }

  .card-header-icon > .icon > .more {
    color: #808080;
  }

  .card-header-icon > .icon > .more:hover {
    color: #0033FF;
  }
</style>
