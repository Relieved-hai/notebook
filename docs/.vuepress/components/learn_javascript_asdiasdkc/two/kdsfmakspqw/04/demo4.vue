<template>
  <div class="h-b">
    <button>Right-click shows browser context menu</button>
    <button oncontextmenu="alert('Draw our menu'); return false">
      Right-click shows our context menu
    </button>
  </div>
</template>

<script>
export default {
  name: "demo",
}
</script>
