<template>
  <div class="h-b">
    <input id="fghrt" type="button" value="Click me">
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('fghrt').onclick = function() {
        alert('Thank you');
      };
    })
  }
}
</script>

<style scoped>

</style>
