<template>
  <div class="content">
    <div class="layout-position">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "position"
  }
</script>

<style scoped lang="scss">
  .content {
    position: relative;
    margin-bottom: 120px;

    .layout-position {
      & > div {
        min-height: 100px;
        position: absolute;
      }

      .left {
        left: 0;
        width: 100px;
        background: red;
      }

      .center {
        left: 100px;
        right: 100px;
        background: yellow;
      }

      .right {
        right: 0;
        width: 100px;
        background: blue;
      }
    }
  }
</style>
