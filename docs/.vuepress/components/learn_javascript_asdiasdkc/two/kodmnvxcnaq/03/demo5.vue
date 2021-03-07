<template>
  <div class="h-b" style="height: 350px;position: relative">
    <p>Drag the ball.</p>

    <img src="./soccer-gate.svg" id="gate" class="droppable">

    <img src="./ball.svg" id="ball5">
  </div>
</template>

<script>
export default {
  name: "demo01221",
  data() {
    return {
      currentDroppable: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      ball5.onmousedown = function (event) {

        let shiftX = event.clientX - ball5.getBoundingClientRect().left;
        let shiftY = event.clientY - ball5.getBoundingClientRect().top;

        ball5.style.position = 'absolute';
        ball5.style.zIndex = 1000;
        document.body.append(ball5);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          ball5.style.left = pageX - shiftX + 'px';
          ball5.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          ball5.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          ball5.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.droppable');

          if (this.currentDroppable != droppableBelow) {
            if (this.currentDroppable) { // null when we were not over a droppable before this event
              leaveDroppable(this.currentDroppable);
            }

            this.currentDroppable = droppableBelow;

            if (this.currentDroppable) { // null if we're not coming over a droppable now
              // (maybe just left the droppable)
              enterDroppable(this.currentDroppable);
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        ball5.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          ball5.onmouseup = null;
        };

      };

      function enterDroppable(elem) {
        elem.style.background = 'pink';
      }

      function leaveDroppable(elem) {
        elem.style.background = '';
      }

      ball5.ondragstart = function () {
        return false;
      };
    })
  }
}
</script>

<style scoped>
#gate {
  cursor: pointer;
  margin-bottom: 100px;
  width: 83px;
  height: 46px;
}

#ball5 {
  cursor: pointer;
  width: 40px;
  height: 40px;
}
</style>
