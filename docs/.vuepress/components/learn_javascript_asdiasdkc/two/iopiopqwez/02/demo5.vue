<template>
  <div class="h-b">
    <textarea id="areaefasda" style="width:80%;height:60px">
      Selecting in this text updates values below.
    </textarea>
    <br>
    From <input id="frasdazxcom" disabled> – To <input id="toxzcaw" disabled>
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    areaefasda.onselect = function () {
      frasdazxcom.value = areaefasda.selectionStart;
      toxzcaw.value = areaefasda.selectionEnd;
    };
  }
}
</script>

<style scoped>

</style>
