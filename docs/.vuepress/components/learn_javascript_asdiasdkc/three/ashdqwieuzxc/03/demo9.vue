<template>
  <div class="h-b" style="overflow: hidden">
    <div id="pathqefvc">
      <div id="brickqefvc"></div>
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

    function makeEaseOut(timing) {
      return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }

    function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }

    let bounceEaseOut = makeEaseOut(bounce);

    brickqefvc.onclick = function () {
      animate({
        duration: 3000,
        timing: bounceEaseOut,
        draw: function (progress) {
          brickqefvc.style.left = progress * 500 + 'px';
        }
      });
    };
  }
}
</script>

<style scoped>
#brickqefvc {
  width: 40px;
  height: 20px;
  background: #EE6B47;
  position: relative;
  cursor: pointer;
}

#pathqefvc {
  outline: 1px solid #E8C48E;
  width: 540px;
  height: 20px;
}
</style>
