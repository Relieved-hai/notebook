<template>
  <div class="h-b">
    <input type="button" id="asdzxc" onclick="alert('Before')" value="Click me">
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      // 覆盖了现有的处理程序
      document.getElementById('asdzxc').onclick = function() {
        alert('After'); // 只会显示此内容
      };
    })
  }
}
</script>

<style scoped>

</style>
