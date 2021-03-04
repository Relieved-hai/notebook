<template>
  <div class="h-b">
    <button id="dfgytq">Alt+Shift+Click on me!</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('dfgytq').onclick = function (event) {
        if (event.altKey && event.shiftKey) {
          alert('Hooray!');
        }
      };
    })
  }
}
</script>

<style scoped>
.textarea {
  font-size: 12px;
  height: 150px;
  width: 360px;
}
</style>
