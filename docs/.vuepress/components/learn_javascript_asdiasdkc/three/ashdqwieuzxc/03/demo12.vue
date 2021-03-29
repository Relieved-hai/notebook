<template>
  <div class="h-b" style="overflow: hidden">
    <div id="field">
      <img src="./ball.svg" width="40" height="40" id="ballasd">
    </div>
  </div>
</template>

<script>
import { animate } from "./animate";

export default {
  name: "demo1",
  mounted() {
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

    ballasd.onclick = function () {

      let to = field.clientHeight - ballasd.clientHeight;

      animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw(progress) {
          ballasd.style.top = to * progress + 'px'
        }
      });
    };
  }
}
</script>

<style scoped>
#field {
  height: 200px;
  border-bottom: 3px black groove;
  position: relative;
}

#ballasd {
  position: absolute;
  cursor: pointer;
}
</style>
