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
  let static = require('node-static');

  let fileServer = new static.Server('.');

  let subscribers = Object.create(null);

  function onSubscribe(req, res) {
    let id = Math.random();

    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.setHeader("Cache-Control", "no-cache, must-revalidate");

    subscribers[id] = res;

    req.on('close', function() {
      delete subscribers[id];
    });

  }

  function publish(message) {

    for (let id in subscribers) {
      let res = subscribers[id];
      res.end(message);
    }

    subscribers = Object.create(null);
  }

  function accept(req, res) {
    let urlParsed = url.parse(req.url, true);

    // new client wants messages
    if (urlParsed.pathname == '/subscribe') {
      onSubscribe(req, res);
      return;
    }

    // sending a message
    if (urlParsed.pathname == '/publish' && req.method == 'POST') {
      // accept POST
      req.setEncoding('utf8');
      let message = '';
      req.on('data', function(chunk) {
        message += chunk;
      }).on('end', function() {
        publish(message); // publish it to everyone
        res.end("ok");
      });

      return;
    }

    // the rest is static
    fileServer.serve(req, res);

  }

  function close() {
    for (let id in subscribers) {
      let res = subscribers[id];
      res.end();
    }
  }

  // -----------------------------------

  if (!module.parent) {
    http.createServer(accept).listen(8080);
    console.log('Server running on port 8080');
  } else {
    exports.accept = accept;

    if (process.send) {
       process.on('message', (msg) => {
         if (msg === 'shutdown') {
           close();
         }
       });
    }

    process.on('SIGINT', close);
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
