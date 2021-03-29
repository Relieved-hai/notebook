<template>
  <div class="h-b">
    Click below to animate:

    <div id="cccdigit">
      <div id="cccstripe">0123456789</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    cccdigit.onclick = function () {
      cccstripe.classList.add('animate');
    }
  }
}
</script>

<style scoped>
#cccdigit {
  width: .5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}

#cccstripe {
  display: inline-block
}

#cccstripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: steps(9, start);
}
</style>
