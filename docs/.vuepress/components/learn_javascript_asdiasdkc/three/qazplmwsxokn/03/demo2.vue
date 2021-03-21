<template>
  <div class="h-b">

    <p>点击该按钮后，访问者会收到一条关于他们是否要离开的“奇怪”问题。</p>

    <p>他们可能会回答“否”，这样就保护了 iframe 不被黑。</p>

    <button @click="attack">添加一个“受保护的” iframe</button>
  </div>
</template>

<script>
export default {
  name: "demo2",
  methods: {
    attack() {
      window.onbeforeunload = function () {
        window.onbeforeunload = null;
        return "Want to leave without learning all the secrets (he-he)?";
      };

      document.body.insertAdjacentHTML('beforeend', '<iframe src="/learn_javascript_asdiasdkc/three/qazplmwsxokn/03/iframe.html">');
    }
  }
}
</script>

<style scoped>

.i-frame {
  width: 400px;
  height: 100px;
  position: absolute;
  top: 0;
  left: -20px;
  opacity: 0;
  z-index: 1;
}
</style>
