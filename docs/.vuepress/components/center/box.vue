<style scoped lang="scss">
  .content {
    margin-top: 150px !important;

  }
  .parent {
    position: relative;
    background: red;

    .child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>

<template>
  <div style="content">
    <div class="parent">
      <div class="child">123</div>
    </div>
  </div>
</template>


<script>

  export default {

    name: "box"
  }
</script>

