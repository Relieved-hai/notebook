<template>
  <div class="h-b">
    Click below to animate:

    <div id="ddddigit">
      <div id="dddstripe">0123456789</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo5",
  mounted() {
    ddddigit.onclick = function () {
      dddstripe.classList.add('animate');
    }
  }
}
</script>

<style scoped>
#ddddigit {
  width: .5em;
  overflow: hidden;
  font: 32px monospace;
  cursor: pointer;
}

#dddstripe {
  display: inline-block
}

#dddstripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
  transition-timing-function: steps(9, end);
}
</style>
