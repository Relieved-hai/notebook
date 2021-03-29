<template>
  <div class="h-b">
    Click below to animate:
    <div id="asdasd">
      <div id="stripeasasasdz">0123456789</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo3",
  mounted() {
    stripeasasasdz.onclick = function () {
      let sec = new Date().getSeconds() % 10;
      stripeasasasdz.style.transitionDelay = '-' + sec + 's';
      stripeasasasdz.classList.add('animate');
    };
  }
}
</script>

<style scoped>
#asdasd {
  width: .5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}

#stripeasasasdz {
  display: inline-block
}

#stripeasasasdz.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: linear;
}
</style>
