<template>
  <div class="h-b" style="padding-bottom: 0">
    点击第一项，然后按 Tab 键。跟踪顺序。请注意，多按几次 Tab 键后，会将焦点移到这个通过 iframe 嵌入的示例的外面。
    <ul>
      <li class="lii" tabindex="1">One</li>
      <li class="lii" tabindex="0">Zero</li>
      <li class="lii" tabindex="2">Two</li>
      <li class="lii" tabindex="-1">Minus one</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "demo2"
}
</script>

<style scoped>
.lii { cursor: pointer; }
:focus { outline: 1px dashed green; }
</style>
