<template>
  <div class="h-b">
    <input type="text" id="inpasdcxcut"> oninput: <span id="resasdcxcuult"></span>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    this.$nextTick(() => {
      inpasdcxcut.oninput = function() {
        resasdcxcuult.innerHTML = inpasdcxcut.value;
      };
    })
  }
}
</script>
