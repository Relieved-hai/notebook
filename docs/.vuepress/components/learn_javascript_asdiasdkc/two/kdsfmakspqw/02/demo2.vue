<template>
  <form class="b" onclick="alert('form')">FORM
    <div class="b" onclick="alert('div')">DIV
      <p class="b" onclick="alert('p')">P</p>
    </div>
  </form>
</template>

<script>
export default {
  name: "demo",
}
</script>

<style scoped>
.b {
  margin: 10px;
  border: 1px solid blue;
}
</style>
