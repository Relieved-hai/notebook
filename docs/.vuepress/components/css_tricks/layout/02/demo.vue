<template>
  <div class="h-b">
    <div class="g-container">
      <div class="g-middle">
        <div class="g-middle-inner middle-inner"></div>
      </div>
      <div class="g-left left"></div>
      <div class="g-right right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo"
}
</script>

<style scoped lang="scss">
.g-container {
  position: relative;
  height: 100px;
  min-width: 400px;

  & > div {
    height: 100px;
    float: left;
    text-align: center;
    color: #fff;
    line-height: 100px;
  }
}

.g-middle {
  position: relative;
  width: 100%;
  background: #cc6630;

  .g-middle-inner {
    margin: 0 200px;
  }
}

.g-left {
  position: relative;
  width: 200px;
  background: #ffcc00;
  margin-left: -100%;
}

.g-right {
  position: relative;
  width: 200px;
  background: pink;
  margin-left: -200px;
}
</style>
