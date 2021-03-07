<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="查看 index.html" name="1">
        <div class="code" style="position:relative;">
          <pre class="language-css">
            <code ref="code"></code>
          </pre>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Prism from "prismjs"

export default {
  methods: {
    handleChange(val) {
    },
    setCode() {
      const code = `
  <!doctype html>
  <html>

  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>

    <p>Drag the ball.</p>

    <img src="./soccer-gate.svg" id="gate" class="droppable">

    <img src="./ball.svg" id="ball">

    <script>
      let currentDroppable = null;

      ball.onmousedown = function(event) {

        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        document.body.append(ball);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          ball.style.left = pageX - shiftX + 'px';
          ball.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          ball.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          ball.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.droppable');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
              // (maybe just left the droppable)
              enterDroppable(currentDroppable);
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };

      };

      function enterDroppable(elem) {
        elem.style.background = 'pink';
      }

      function leaveDroppable(elem) {
        elem.style.background = '';
      }

      ball.ondragstart = function() {
        return false;
      };
    \<\/script>
  </body>
  </html>
`
      this.$refs['code'].innerHTML = Prism.highlight(code, Prism.languages.css)
    }
  },
  mounted() {
    this.setCode();
  },
  data() {
    return {
      activeNames: ['0'],
      dialogVisible: false
    }
  },
  name: "cloudy1"
}
</script>
