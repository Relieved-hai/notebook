<template>
  <div class="h-b" style="height: 30px;position: relative">
    <div class="asdqwe" style="background:blue" onmouseover="alert('never works')"></div>
    <div class="asdqwe" style="background:red" onmouseover="alert('over red!')"></div>
  </div>
</template>

<script>
export default {
  name: "demo01221",
}
</script>

<style scoped>
.asdqwe {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
}
</style>
