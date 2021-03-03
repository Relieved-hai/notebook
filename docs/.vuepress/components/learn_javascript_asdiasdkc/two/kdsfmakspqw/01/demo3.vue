<template>
  <div class="h-b">
    <input id="iopadsz" type="button" value="Click me">
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('iopadsz').onclick = function() {
        alert('Click!');
      };
    })
  }
}
</script>

<style scoped>

</style>
