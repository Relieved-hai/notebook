<template>
  <div class="h-b" style="overflow: hidden">
    <div id="fieldasdqz">
      <img src="./ball.svg" width="40" height="40" id="ballasdqz">
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

    function quad(timeFraction) {
      return Math.pow(timeFraction, 2);
    }

    ballasdqz.onclick = function () {

      let height = fieldasdqz.clientHeight - ballasdqz.clientHeight;
      let width = 100;

      animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw: function (progress) {
          ballasdqz.style.top = height * progress + 'px'
        }
      });

      animate({
        duration: 2000,
        timing: makeEaseOut(quad),
        draw: function (progress) {
          ballasdqz.style.left = width * progress + "px"
        }
      });
    }
  }
}
</script>

<style scoped>
#fieldasdqz {
  height: 200px;
  border-bottom: 3px black groove;
  position: relative;
}

#ballasdqz {
  position: absolute;
  cursor: pointer;
}
</style>
