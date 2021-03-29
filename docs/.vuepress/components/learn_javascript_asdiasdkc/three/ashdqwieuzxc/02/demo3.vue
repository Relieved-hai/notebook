<template>
  <div class="h-b">
    Click below to animate:
    <div id="digitasd">
      <div id="stripeasasz">0123456789</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo3",
  mounted() {
    stripeasasz.onclick = function () {
      stripeasasz.classList.add('animate');
    };
  }
}
</script>

<style scoped>
#digitasd {
  width: .5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}

#stripeasasz {
  display: inline-block
}

#stripeasasz.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: linear;
}

</style>
