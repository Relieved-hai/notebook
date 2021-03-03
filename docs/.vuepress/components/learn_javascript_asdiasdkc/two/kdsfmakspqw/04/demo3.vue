<template>
  <div class="h-b" style="background: transparent">
    <input value="Focus works" onfocus="this.value=''">
    <input onmousedown="return false" onfocus="this.value=''" value="Click me">
  </div>
</template>

<script>
export default {
  name: "demo",
}
</script>
