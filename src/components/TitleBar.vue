<template>
  <div class="titlebar has-text-centered is-size-7">{{ message }}</div>
</template>

<script>
  export default {
    name: 'titlebar',
    props: ['message']
  }
</script>

<style lang="css">
  .titlebar {
    font-family: sans-serif !important;
    padding: 5px 0 5px 0;
    color: #ffffff;
    background: linear-gradient(225deg, #1145ce 0%, #0c16b3 100%);
  }
</style>
