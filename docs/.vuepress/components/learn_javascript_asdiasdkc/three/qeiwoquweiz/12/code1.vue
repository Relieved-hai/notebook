<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="查看 server.js" name="1">
      <div class="code" style="position:relative;">
          <pre class="language-css">
            <code ref="code"></code>
          </pre>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Prism from "prismjs"

export default {
  methods: {
    handleChange(val) {
    },
    setCode() {
      const code = `
  let http = require('http');
  let url = require('url');
  let querystring = require('querystring');

  function onDigits(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache'
    });

    let i = 0;

    let timer = setInterval(write, 1000);
    write();

    function write() {
      i++;

      if (i == 4) {
        res.write('event: bye\\ndata: bye-bye\\n\\n');
        clearInterval(timer);
        res.end();
        return;
      }

      res.write('data: ' + i + '\\n\\n');

    }
  }

  function accept(req, res) {

    if (req.url == '/digits') {
      onDigits(req, res);
      return;
    }

    fileServer.serve(req, res);

  }


  if (!module.parent) {
    http.createServer(accept).listen(8080);
  } else {
    exports.accept = accept;
  }
`
      this.$refs['code'].innerHTML = Prism.highlight(code, Prism.languages.javascript)
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
  name: "breeze"
}
</script>
