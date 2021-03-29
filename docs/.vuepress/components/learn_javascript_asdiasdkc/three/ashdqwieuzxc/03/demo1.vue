<template>
  <div class="h-b">
    <img id="trainqzv" src="../02/train.gif">
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    trainqzv.onclick = function () {
      let start = Date.now();

      let timer = setInterval(function () {
        let timePassed = Date.now() - start;

        trainqzv.style.left = timePassed / 5 + 'px';

        if (timePassed > 2000) clearInterval(timer);

      }, 20);
    }
  }
}
</script>

<style scoped>
#trainqzv {
  position: relative;
  cursor: pointer;
}
</style>
