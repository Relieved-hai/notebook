<template>
  <div class="h-b">
    <p>Drag the ball.</p>
    <img src="../03/ball.svg" style="cursor:pointer" width="40" height="40" id="demo2ball">
    <textarea id="demo2text" style="display:block;width:300px;height:100px"/>
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    this.$nextTick(() => {
      demo2ball.onpointerdown = log;
      demo2ball.onpointerup = log;
      demo2ball.onpointermove = log;
      demo2ball.onpointercancel = log;

      let lastEventType;
      let n = 1;

      function log(event) {
        if (lastEventType == event.type) {
          n++;
          demo2text.value = demo2text.value.replace(/.*\n$/, `${event.type} * ${n}\n`);
          return;
        }
        lastEventType = event.type;
        n = 1;
        demo2text.value += event.type + '\n';
        demo2text.scrollTop = 1e9;
      }
    })
  }
}
</script>

<style scoped>

</style>
