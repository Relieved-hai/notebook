<template>
  <div class="h-b">
    <button id="qweiomsgrowing">Click me</button>
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    qweiomsgrowing.onclick = function () {
      this.style.fontSize = '36px';
      this.style.color = 'red';
    };
  }
}
</script>

<style scoped>
#qweiomsgrowing {
  transition: font-size 3s, color 2s;
}
</style>
