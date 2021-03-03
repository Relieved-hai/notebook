<template>
  <div class="h-b">
    <div onclick="alert(`the bubbling doesn't reach here`)">
      <button onclick="event.stopPropagation()">Click me</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
}
</script>
