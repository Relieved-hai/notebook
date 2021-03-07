<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="查看 style.css" name="1">
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
  #parent {
    background: #99C0C3;
    width: 160px;
    height: 120px;
    position: relative;
  }

  #child {
    background: #FFDE99;
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  textarea {
    height: 140px;
    width: 300px;
    display: block;
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
