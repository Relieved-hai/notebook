<template>
  <div class="layout-table">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    name: "tabl"
  }
</script>

<style scoped lang="scss">
  .layout-table {
    width: 100%;
    height: 100px;
    display: table;

    & > div {
      display: table-cell;
    }

    .left {
      width: 100px;
      background: red;
    }

    .center {
      background: yellow;
    }

    .right {
      width: 100px;
      background: blue;
    }
  }
</style>
