<template>
  <div class="h-b" id="aisdqweqwe">
    <div id="areaaa"></div>
  </div>
</template>

<script>
export default {
  name: "cfsasd",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('aisdqweqwe').onpointerdown = document.getElementById('aisdqweqwe').onpointerup = log;

      function log(event) {
        areaaa.insertAdjacentHTML("beforeend", `
          <div>${event.type} isPrimary=${event.isPrimary} pointerId=${event.pointerId}</div>
        `)
        areaaa.scrollTop = 1e9;
      }

    })
  }
}
</script>

<style scoped>
#areaaa {
  border: 1px solid black;
  width: 90%;
  height: 180px;
  cursor: pointer;
  overflow: scroll;
  user-select: none;
}
</style>
