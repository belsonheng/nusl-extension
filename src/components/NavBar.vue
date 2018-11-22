<template>
  <div class="level two-items">
    <slot></slot>
  </div>
</template>

<style lang="css">
  .level {
    display: flex;
  }
  .two-items .level-item {
    width: 50%;
    margin-bottom: 0 !important;
  }
  .level-item {
    font-family: sans-serif;
    font-size: 13px;
    padding: 8px;
    cursor: pointer;
    background-color: #e0e7f1;
    color: #0052f3;
  }
  .level-item.active {
    font-weight: 700;
    background-color: #f1f3f7;
  }
</style>
