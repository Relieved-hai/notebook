<template>
  <div class="h-b">
    <progress id="elem" @click="click"></progress>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
  },
  methods: {
    click() {
      this.animate({
        duration: 1000,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          elem.style.width = progress * 100 + '%';
        }
      });
    },
    animate({ duration, draw, timing }) {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }
  }
}
</script>

<style scoped>
progress {
  width: 5%;
}
</style>
