<template>
  <div class="h-b">
    <input id="bgbgdasd" style="width:200px" value="Replace THIS in text">
    <button id="axcadqwe">Replace THIS</button>
  </div>
</template>

<script>
export default {
  name: "demo8",
  mounted() {
    axcadqwe.onclick = () => {
      let pos = bgbgdasd.value.indexOf("THIS");
      if (pos >= 0) {
        bgbgdasd.setRangeText("*THIS*", pos, pos + 4, "select");
        bgbgdasd.focus(); // 聚焦（focus），以使选择可见
      }
    };
  }
}
</script>
