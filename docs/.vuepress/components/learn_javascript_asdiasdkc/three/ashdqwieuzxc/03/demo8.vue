<template>
  <div class="h-b" style="overflow: hidden">
    <div id="pathzqpm">
      <div id="brickzqpm"></div>
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

    brickzqpm.onclick = function () {
      animate({
        duration: 3000,
        timing: function elastic(x, timeFraction) {
          return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
        }.bind(null, 1.5),
        draw: function (progress) {
          brickzqpm.style.left = progress * 500 + 'px';
        }
      });
    };
  }
}
</script>

<style scoped>
#brickzqpm {
  width: 40px;
  height: 20px;
  background: #EE6B47;
  position: relative;
  cursor: pointer;
}

#pathzqpm {
  outline: 1px solid #E8C48E;
  width: 540px;
  height: 20px;
}
</style>
