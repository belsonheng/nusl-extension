<template>
  <div v-show="getFlashMessage" class="help is-danger">{{ getFlashMessage }}</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'flash',
    computed: {
      ...mapGetters([
        'getFlashMessage'
      ])
    }
  }
</script>
