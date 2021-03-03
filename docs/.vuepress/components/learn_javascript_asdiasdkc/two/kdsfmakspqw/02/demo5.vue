<template>
  <html class="de h-b">
  <body class="de">
  <form class="de bor">FORM
    <div class="de bor">DIV
      <p class="bor de">P</p>
    </div>
  </form>
  </body>
  </html>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      for (let elem of document.querySelectorAll('.de')) {
        elem.addEventListener('click', e => alert(`Capturing: ${elem.tagName}`), true);
        elem.addEventListener('click', e => alert(`Bubbling: ${elem.tagName}`));
      }
    })
  }
}
</script>
<style scoped>
.bor {
  margin: 10px;
  border: 1px solid blue;
}
</style>
