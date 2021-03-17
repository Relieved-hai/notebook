<template>
  <div class="h-b">
    <input type="text" id="rfbasdqinput">
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    this.$nextTick(() => {
      rfbasdqinput.oncut = rfbasdqinput.oncopy = rfbasdqinput.onpaste = function (event) {
        alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
        return false;
      };
    })
  }
}
</script>
