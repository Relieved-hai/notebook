<template>
  <div id="asdfgbnm" class="h-b" style="padding-top: 0">
    <p>Right-click for the document menu</p>
    <button id="cvghjghj">Right-click for the button menu (fixed with event.stopPropagation)</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('cvghjghj').oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        alert("Button context menu");
      };
      document.getElementById('asdfgbnm').oncontextmenu = function (event) {
        event.preventDefault();
        alert("Document context menu");
      };
    })
  }
}
</script>
