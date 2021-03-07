<template>
  <div class="h-b">
    <p>Drag the ball.</p>
    <img src="../03/ball.svg" style="cursor:pointer" width="40" height="40" id="demo3ball">
    <textarea id="demo3text" style="display:block;width:300px;height:100px"/>
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    this.$nextTick(() => {
      demo3ball.onpointerdown = log;
      demo3ball.onpointerup = log;
      demo3ball.onpointermove = log;
      demo3ball.onpointercancel = log;

      demo3ball.ondragstart = () => false;

      let lastEventType;
      let n = 1;

      function log(event) {
        if (lastEventType == event.type) {
          n++;
          demo3text.value = demo3text.value.replace(/.*\n$/, `${event.type} * ${n}\n`);
          return;
        }
        lastEventType = event.type;
        n = 1;
        demo3text.value += event.type + '\n';
        demo3text.scrollTop = 1e9;
      }

    })
  }
}
</script>

<style scoped>

</style>
