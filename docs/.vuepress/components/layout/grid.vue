<template>
  <div class="layout-grid">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    name: "grid"
  }
</script>

<style scoped lang="scss">
  .layout-grid {
    width: 100%;
    display: grid;
    grid-template-rows: 100px;
    grid-template-columns: 100px auto 100px;

    & > div {
      display: table-cell;
    }

    .left {
      /*width: 100px;*/
      background: red;
    }

    .center {
      background: yellow;
    }

    .right {
      background: blue;
    }
  }
</style>
