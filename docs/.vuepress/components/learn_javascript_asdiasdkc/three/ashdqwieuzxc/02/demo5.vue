<template>
  <div class="h-b">
    <img id="trainera" src="./train.gif">
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    trainera.onclick = function () {
      this.style.left = '450px'
    }
  }
}
</script>

<style scoped>
#trainera {
  position: relative;
  cursor: pointer;
  width: 177px;
  height: 160px;
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
}
</style>
