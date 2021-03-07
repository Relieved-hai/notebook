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
  #text {
    display: block;
    height: 100px;
    width: 456px;
  }

  #table th {
    text-align: center;
    font-weight: bold;
  }

  #table td {
    width: 150px;
    white-space: nowrap;
    text-align: center;
    vertical-align: bottom;
    padding-top: 5px;
    padding-bottom: 12px;
    cursor: pointer;
  }

  #table .nw {
    background: #999;
  }

  #table .n {
    background: #03f;
    color: #fff;
  }

  #table .ne {
    background: #ff6;
  }

  #table .w {
    background: #ff0;
  }

  #table .c {
    background: #60c;
    color: #fff;
  }

  #table .e {
    background: #09f;
    color: #fff;
  }

  #table .sw {
    background: #963;
    color: #fff;
  }

  #table .s {
    background: #f60;
    color: #fff;
  }

  #table .se {
    background: #0c3;
    color: #fff;
  }

  #table .highlight {
    background: red;
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
