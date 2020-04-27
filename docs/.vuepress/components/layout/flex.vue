<template>
  <div class="layout-flex">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    name: "flex"
  }
</script>

<style scoped lang="scss">
  .layout-flex {
    display: flex;

    div {
      min-height: 100px;
    }

    .left {
      width: 100px;
      background: red;
    }

    .center {
      flex: 1;
      background: yellow;
    }

    .right {
      width: 100px;
      background: blue;
    }
  }
</style>
