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
  table.onmouseover = function(event) {
    let target = event.target;
    target.style.background = 'pink';

    text.value += 'over -> ' + target.tagName + '\\n';
    text.scrollTop = text.scrollHeight;
  };

  table.onmouseout = function(event) {
    let target = event.target;
    target.style.background = '';

    text.value += 'out <- ' + target.tagName + '\\n';
    text.scrollTop = text.scrollHeight;
  };
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
