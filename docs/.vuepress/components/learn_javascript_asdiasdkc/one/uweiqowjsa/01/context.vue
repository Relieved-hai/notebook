<template>
  <p style="margin: 8px 0">
    <span class="l-o-u-1-c" :style="getBold">{{ context }}</span>
    <span style="color: gray;font-weight: bold;" :style="getBold">{{ call }}</span>
  </p>
</template>

<script>
export default {
  name: "context",
  props: {
    context: String,
    call: String,
    bold: {
      type: String,
      default: () => 'bold'
    }
  },
  computed: {
    getBold() {
      return `font-weight: ${this.bold}`
    }
  }
}
</script>

<style scoped>
.l-o-u-1-c {
  padding: 4px 6px;
  margin: 0 4px;
  font-family: 'DejaVu Sans Mono', 'Lucida Console', 'Menlo', 'Monaco', monospace;
  border: 1px solid black;
}
</style>
