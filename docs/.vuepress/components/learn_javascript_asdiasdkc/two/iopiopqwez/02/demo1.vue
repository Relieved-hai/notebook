<template>
  <div class="h-b">
    <p id="qwedasdp">Example: <i>italic</i> and <b>bold</b></p>

    From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
    <button id="button" @click="rangeHandle">Click to select</button>
  </div>
</template>

<script>

export default {
  name: "demo2",
  mounted() {
  },
  methods: {
    rangeHandle() {
      let range = new Range();

      range.setStart(qwedasdp, start.value);
      range.setEnd(qwedasdp, end.value);

      // 应用选择，后文有解释
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(range);
    }
  }
}
</script>

<style scoped>

</style>
