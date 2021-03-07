<template>
  <div class="h-b">
    <div id="demo4slider" class="demo4slider">
      <div class="thumb" style="left: 133.258px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    this.$nextTick(() => {

      let thumb = demo4slider.querySelector('.thumb');
      let shiftX;

      thumb.onpointerdown = function (event) {
        event.preventDefault(); // 阻止开始选择（浏览器行为）

        shiftX = event.clientX - thumb.getBoundingClientRect().left;

        thumb.setPointerCapture(event.pointerId);
      };

      thumb.onpointermove = function (event) {
        let newLeft = event.clientX - shiftX - demo4slider.getBoundingClientRect().left;

        // 如果指针移出了滑块 => 调整 left 来防止其超出边界
        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge = demo4slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
      };

      thumb.ondragstart = () => false;

    })
  }
}
</script>

<style scoped>
.demo4slider {
  border-radius: 5px;
  background: #E0E0E0;
  background: linear-gradient(left top, #E0E0E0, #EEEEEE);
  width: 310px;
  height: 15px;
  margin: 5px;
}

.thumb {
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  left: 10px;
  top: -5px;
  background: blue;
  cursor: pointer;
}
</style>
