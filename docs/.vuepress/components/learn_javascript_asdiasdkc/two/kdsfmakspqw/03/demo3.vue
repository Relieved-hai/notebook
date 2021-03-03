<template>
  <div class="h-b" id="documentElem">
    Counter: <input type="button" value="1" data-counter>
    One more counter: <input type="button" value="2" data-counter>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('documentElem').addEventListener('click', function(event) {
        // 如果这个特性存在...
        if (event.target.dataset.counter != undefined) {
          event.target.value++;
        }
      });
    })
  }
}
</script>
