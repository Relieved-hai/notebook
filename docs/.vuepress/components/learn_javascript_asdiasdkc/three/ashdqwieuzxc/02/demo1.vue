<template>
  <div class="h-b">
    <button id="asdasdcolor">Click me</button>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    asdasdcolor.onclick = function () {
      this.style.backgroundColor = 'red';
    };
  }
}
</script>

<style scoped>
#asdasdcolor {
  transition-property: background-color;
  transition-duration: 3s;
}
</style>
