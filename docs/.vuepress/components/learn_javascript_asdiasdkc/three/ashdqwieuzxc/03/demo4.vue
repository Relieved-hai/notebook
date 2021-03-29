<template>
  <div class="h-b">
    <div id="pathpkqwe">
      <div id="brickpkqwe"></div>
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

    brickpkqwe.onclick = function () {
      animate({
        duration: 1000,
        timing: function (timeFraction) {
          return Math.pow(timeFraction, 5);
        },
        draw: function (progress) {
          brickpkqwe.style.left = progress * 500 + 'px';
        }
      });
    };
  },
  methods: {}
}
</script>

<style scoped>
#brickpkqwe {
  width: 40px;
  height: 20px;
  background: #EE6B47;
  position: relative;
  cursor: pointer;
}

#pathpkqwe {
  outline: 1px solid #E8C48E;
  width: 540px;
  height: 20px;
}
</style>
