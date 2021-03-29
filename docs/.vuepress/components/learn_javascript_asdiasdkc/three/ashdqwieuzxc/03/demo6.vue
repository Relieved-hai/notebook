<template>
  <div class="h-b" style="overflow: hidden">
    <div id="pathouyi">
      <div id="brickouyi"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    function animate(options) {
      var start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // текущее состояние анимации
        var progress = options.timing(timeFraction)

        options.draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }

    brickouyi.onclick = function () {
      animate({
        duration: 1000,
        timing: function back(x, timeFraction) {
          return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
        }.bind(null, 1.5),
        draw: function (progress) {
          brickouyi.style.left = progress * 500 + 'px';
        }
      });
    };
  }
}
</script>

<style scoped>
#brickouyi {
  width: 40px;
  height: 20px;
  background: #EE6B47;
  position: relative;
  cursor: pointer;
}

#pathouyi {
  outline: 1px solid #E8C48E;
  width: 540px;
  height: 20px;
}
</style>
