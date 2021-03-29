<template>
  <div class="h-b">
    <div class="progress"></div>
  </div>
</template>

<script>
export default {
  name: "demo5"
}
</script>

<style scoped>
@keyframes go-left-right { /* 指定一个名字："go-left-right" */
  from {
    left: 0px;
  }
  /* 从 left: 0px 开始 */
  to {
    left: calc(100% - 50px);
  }
  /* 移动至 left: 100%-50px */
}

.progress {
  animation: go-left-right 3s infinite alternate;
  /* 把动画 "go-left-right" 应用到元素上
     持续 3 秒
     持续次数：infinite
     每次都改变方向
  */

  position: relative;
  border: 2px solid green;
  width: 50px;
  height: 20px;
  background: lime;
}
</style>
