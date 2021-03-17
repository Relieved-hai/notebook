<template>
  <div class="h-b">
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    From <input id="fromasdzxczxc" disabled> – To <input id="toqweasdzxc" disabled>
  </div>
</template>

<script>

export default {
  name: "demo2",
  mounted() {
    document.onselectionchange = function () {
      let { anchorNode, anchorOffset, focusNode, focusOffset } = document.getSelection();

      fromasdzxczxc.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
      toqweasdzxc.value = `${focusNode && focusNode.data}:${focusOffset}`;
    };
  }
}
</script>
