<template>
  <div class="h-b">
    <img id="trainerazzz" src="./train.gif">
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    trainerazzz.onclick = function () {
      this.style.left = '450px'
    }
  }
}
</script>

<style scoped>
#trainerazzz {
  position: relative;
  cursor: pointer;
  width: 177px;
  height: 160px;
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
}
</style>
