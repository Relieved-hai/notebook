<template>

  <div id="ball1" class="h-b" style="height: 250px; position: relative;">
    <p>Drag the ball.</p>
    <img src="./ball.svg" style="cursor:pointer" width="40" height="40" id="ball">
  </div>
</template>

<script>
export default {
  name: "demo011",
  mounted() {
    this.$nextTick(() => {
      ball.onmousedown = function (event) {
        // (1) 准备移动：确保 absolute，并通过设置 z-index 以确保球在顶部
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;

        // 将其从当前父元素中直接移动到 body 中
        // 以使其定位是相对于 body 的
        document.body.append(ball);

        // 现在球的中心在 (pageX, pageY) 坐标上
        function moveAt(pageX, pageY) {
          ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
          ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        }

        // 将我们绝对定位的球移到指针下方
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        // (2) 在 mousemove 事件上移动球
        document.addEventListener('mousemove', onMouseMove);

        // (3) 放下球，并移除不需要的处理程序
        ball.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };

      };
    })
  }
}
</script>

<style scoped>

</style>
