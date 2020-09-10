<template>
  <div class="content">
    <div class="layout-float">
      <div class="left"></div>
      <div class="right"></div>
      <div class="center"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "float"
  }
</script>

<style scoped lang="scss">
  .content {
    padding: 0;
    margin: 0;

    .layout-float {
      div {
        min-height: 100px;
      }

      .left {
        float: left;
        width: 100px;
        background: red;
      }

      .center {
        background: yellow;
      }

      .right {
        float: right;
        width: 100px;
        background: blue;
      }
    }
  }
</style>
