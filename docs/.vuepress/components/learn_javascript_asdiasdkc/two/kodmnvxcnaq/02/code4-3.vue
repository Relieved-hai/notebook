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
  <!DOCTYPE HTML>
  <html>

    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
    </head>

    <body>
      <table id="table">
        <tr>
          <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
        </tr>
        <tr>
          <td class="nw"><strong>Northwest</strong>
            <br>Metal
            <br>Silver
            <br>Elders
          </td>
          <td class="n"><strong>North</strong>
            <br>Water
            <br>Blue
            <br>Change
          </td>
          <td class="ne"><strong>Northeast</strong>
            <br>Earth
            <br>Yellow
            <br>Direction
          </td>
        </tr>
        <tr>
          <td class="w"><strong>West</strong>
            <br>Metal
            <br>Gold
            <br>Youth
          </td>
          <td class="c"><strong>Center</strong>
            <br>All
            <br>Purple
            <br>Harmony
          </td>
          <td class="e"><strong>East</strong>
            <br>Wood
            <br>Blue
            <br>Future
          </td>
        </tr>
        <tr>
          <td class="sw"><strong>Southwest</strong>
            <br>Earth
            <br>Brown
            <br>Tranquility
          </td>
          <td class="s"><strong>South</strong>
            <br>Fire
            <br>Orange
            <br>Fame
          </td>
          <td class="se"><strong>Southeast</strong>
            <br>Wood
            <br>Green
            <br>Romance
          </td>
        </tr>

      </table>

      <textarea id="text"></textarea>

      <input type="button" onclick="text.value=''" value="Clear">

      <script src="script.js">\<\/script>

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
