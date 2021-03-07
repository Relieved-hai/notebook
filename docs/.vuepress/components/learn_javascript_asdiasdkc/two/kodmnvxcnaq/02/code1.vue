<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="查看 script.js" name="1">
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
  container.onmouseover = container.onmouseout = handler;

  function handler(event) {

    function str(el) {
      if (!el) return "null"
      return el.className || el.tagName;
    }

    log.value += event.type + ':  ' +
      'target=' + str(event.target) +
      ',  relatedTarget=' + str(event.relatedTarget) + "\\n";
    log.scrollTop = log.scrollHeight;

    if (event.type == 'mouseover') {
      event.target.style.background = 'pink'
    }
    if (event.type == 'mouseout') {
      event.target.style.background = ''
    }
  }
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
