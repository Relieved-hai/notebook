<template>
  <div class="h-b" style="position: relative">
    <div>点击即可变得富有：</div>

    <!-- 来自受害网站的 url -->
    <iframe class="iframe" :style="{ opacity: opac ? '0' : '0.5' }" src="/learn_javascript_asdiasdkc/three/qazplmwsxokn/03/facebook.html"/>

    <button>点这里！</button>

    <div>……你很酷（我实际上是一名帅气的黑客）！</div>
  </div>
</template>

<script>
export default {
  name: "demo1",
  props: {
    opac: String
  }
}
</script>

<style scoped>

.iframe {
  width: 400px;
  height: 100px;
  position: absolute;
  top: 5px;
  left: -14px;
  opacity: 0.5;
  z-index: 1;
}
</style>
