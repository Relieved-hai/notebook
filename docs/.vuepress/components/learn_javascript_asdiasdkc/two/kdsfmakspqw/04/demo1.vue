<template>
  <div class="h-b">
    <a href="/" onclick="return false">Click here</a>
    or
    <a href="/" onclick="event.preventDefault()">here</a>
  </div>
</template>

<script>
export default {
  name: "demo",
}
</script>

<style scoped>

</style>
