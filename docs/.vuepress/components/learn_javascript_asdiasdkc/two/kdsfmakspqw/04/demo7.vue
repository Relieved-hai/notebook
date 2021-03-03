<template>
  <div id="tyioptr" class="h-b" style="padding-top: 0;">
    <p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
    <button id="zxczxcvbnvbn">Right-click for the button menu</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('zxczxcvbnvbn').oncontextmenu = function(event) {
        event.preventDefault();
        alert("Button context menu");
      };
      document.getElementById('tyioptr').oncontextmenu = function(event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        alert("Document context menu");
      };
    })
  }
}
</script>
