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

      <div id="parent">parent
        <div id="child">child</div>
      </div>
      <textarea id="text"></textarea>
      <input onclick="clearText()" value="Clear" type="button">

      <script src="script.js" />
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
