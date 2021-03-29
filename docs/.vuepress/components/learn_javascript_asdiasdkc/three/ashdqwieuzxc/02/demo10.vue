<template>
  <div class="h-b">
    <img src="https://js.cx/clipart/boat.png" id="boat">
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    boat.onclick = function () {

      this.onclick = null; // only the first click should start the animation

      let times = 1;

      function go() {
        if (times % 2) {
          boat.classList.remove('back');
          boat.style.marginLeft = 100 * times + 200 + 'px';
        } else {
          boat.classList.add('back');
          boat.style.marginLeft = 100 * times - 200 + 'px';
        }

      }

      go();

      boat.addEventListener('transitionend', function () {
        times++;
        go();
      });
    }

  }
}
</script>

<style scoped>
#boat {
  margin-left: 0;
  cursor: pointer;
  transition: margin-left 3s ease-in-out;
}

/* flipping the picture with CSS */
.back {
  transform: scaleX(-1);
  filter: fliph;
}
</style>
