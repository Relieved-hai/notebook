<template>
  <div class="h-b">
    <button id="qkowe">Menu (click me)</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      rabbit: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      const _dom = document.getElementById('qkowe')
      _dom.onclick = function() {
        alert(1);
        _dom.dispatchEvent(new CustomEvent('menu-open', {
          bubbles: true
        }));
        alert(2);
      };
      // 在 1 和 2 之间触发
      document.addEventListener('menu-open', () => alert('nested'));
    })
  }
}
</script>

<style scoped>

</style>
