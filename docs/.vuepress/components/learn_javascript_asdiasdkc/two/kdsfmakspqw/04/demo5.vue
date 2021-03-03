<template>
  <div class="h-b" style="padding-top: 0" id="aaxzcxczxc">
    <p>Right-click here for the document context menu</p>
    <button id="iodrteqe">Right-click here for the button context menu</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('iodrteqe').oncontextmenu = function (event) {
        event.preventDefault();
        alert("Button context menu");
      };
      document.getElementById('aaxzcxczxc').oncontextmenu = function (event) {
        event.preventDefault();
        alert("Document context menu");
      };
    })
  }
}
</script>
