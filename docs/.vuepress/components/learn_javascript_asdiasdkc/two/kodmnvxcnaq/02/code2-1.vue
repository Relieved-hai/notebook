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
  let parent = document.getElementById('parent');
    parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

    function handler(event) {
      let type = event.type;
      while (type < 11) type += ' ';

      log(type + " target=" + event.target.id)
      return false;
    }


    function clearText() {
      text.value = "";
      lastMessage = "";
    }

    let lastMessageTime = 0;
    let lastMessage = "";
    let repeatCounter = 1;

    function log(message) {
      if (lastMessageTime == 0) lastMessageTime = new Date();

      let time = new Date();

      if (time - lastMessageTime > 500) {
        message = '------------------------------\\n' + message;
      }

      if (message === lastMessage) {
        repeatCounter++;
        if (repeatCounter == 2) {
          text.value = text.value.trim() + ' x 2\\n';
        } else {
          text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\\n";
        }

      } else {
        repeatCounter = 1;
        text.value += message + "\\n";
      }

      text.scrollTop = text.scrollHeight;

      lastMessageTime = time;
      lastMessage = message;
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
