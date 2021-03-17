<template>
  <div class="h-b">
    <input id="inasdasput" style="width:200px" value="Select here and click the button">
    <button id="buttoasdasn">Wrap selection in stars *...*</button>
  </div>
</template>

<script>
export default {
  name: "demo7",
  mounted() {
    buttoasdasn.onclick = () => {
      if (inasdasput.selectionStart == inasdasput.selectionEnd) {
        return; // 什么都没选
      }

      let selected = inasdasput.value.slice(inasdasput.selectionStart, inasdasput.selectionEnd);
      inasdasput.setRangeText(`*${selected}*`);
    };
  }
}
</script>
