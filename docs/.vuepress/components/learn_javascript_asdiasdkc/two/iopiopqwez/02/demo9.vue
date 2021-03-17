<template>
  <div class="h-b">
    <input id="irtuonput" style="width:200px" value="Text Text Text Text Text">
    <button id="butasdaszxccton">Insert "HELLO" at cursor</button>
  </div>
</template>

<script>
export default {
  name: "demo9",
  mounted() {
    butasdaszxccton.onclick = () => {
      irtuonput.setRangeText("HELLO", irtuonput.selectionStart, irtuonput.selectionEnd, "end");
      irtuonput.focus();
    };
  }
}
</script>
