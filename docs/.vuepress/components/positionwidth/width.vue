<template>
  <div class="content">
    <div class="item">
      <span class="tip">
        emmmmmmmmmmmmmmmmmmmmmm
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "width"
  }
</script>

<style scoped>
  .content {
    position: relative;
    width: 100%;
    height: 200px;
  }

  .item {
    width: 30px;
    height: 30px;
    background: #fff;
    border: 8px solid #00adb5;
    color: #00adb5;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    right: 0;
    margin-left: -15px;
    bottom: 50px;
  }

  .tip {
    white-space: nowrap;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 40px;


    padding: 5px 14px;
    background-color: #fff;
    font-size: 16px;
    color: #00adb5;
    border: 1px solid #00adb5;
    border-radius: 21px;
  }

  .tip:before {
    content: "";
    width: 0;
    height: 0;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 10px 10px 0;
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
  }

  .tip:after {
    content: "";
    width: 0;
    height: 0;
    border-color: #00adb5 transparent transparent;
    border-style: solid;
    border-width: 10px 10px 0;
    position: absolute;
    bottom: -11px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
</style>
