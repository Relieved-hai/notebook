<template>
  <div class="box" onclick="alert('The handler!')">
    <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
  </div>
</template>

<script>
export default {
  name: "demo",
}
</script>

<style scoped>
.box {
  padding: 10px;
  border: 1px solid #d6d6d6;
}
</style>
