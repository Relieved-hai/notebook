<template>

  <div class="h-b" style="height: 250px; position: relative;">
    <p>Drag the ball.</p>
    <img src="./ball.svg" style="cursor:pointer" width="40" height="40" id="ball3">
  </div>
</template>

<script>
export default {
  name: "demo01221",
  mounted() {
    this.$nextTick(() => {
      ball3.onmousedown = function (event) {
        let shiftX = event.clientX - ball3.getBoundingClientRect().left;
        let shiftY = event.clientY - ball3.getBoundingClientRect().top;

        // (1) 准备移动：确保 absolute，并通过设置 z-index 以确保球在顶部
        ball3.style.position = 'absolute';
        ball3.style.zIndex = 1000;

        // 将其从当前父元素中直接移动到 body 中
        // 以使其定位是相对于 body 的
        document.body.append(ball3);

        // 现在球的中心在 (pageX, pageY) 坐标上
        function moveAt(pageX, pageY) {
          ball3.style.left = pageX - shiftX + 'px';
          ball3.style.top = pageY - shiftY + 'px';
        }

        // 将我们绝对定位的球移到指针下方
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        // (2) 在 mousemove 事件上移动球
        document.addEventListener('mousemove', onMouseMove);

        // (3) 放下球，并移除不需要的处理程序
        ball3.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          ball3.onmouseup = null;
        };
      };

      ball3.ondragstart = function () {
        return false;
      };
    })
  }
}
</script>

<style scoped>

</style>
