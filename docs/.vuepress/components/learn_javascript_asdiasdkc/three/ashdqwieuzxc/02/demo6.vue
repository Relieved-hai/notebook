<template>
  <div class="h-b">
    <img id="traineraqqq" src="./train.gif">
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    traineraqqq.onclick = function () {
      this.style.left = '450px'
    }
  }
}
</script>

<style scoped>
#traineraqqq {
  position: relative;
  cursor: pointer;
  width: 177px;
  height: 160px;
  left: 0px;
  transition: left 5s cubic-bezier(0.0, 0.5, 0.5, 1.0);
}
</style>
