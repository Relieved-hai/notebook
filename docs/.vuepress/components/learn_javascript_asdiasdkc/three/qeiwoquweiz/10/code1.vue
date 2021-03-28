<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="查看 browser.js" name="1">
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
  // Sending messages, a simple POST
  function PublishForm(form, url) {

    function sendMessage(message) {
      fetch(url, {
        method: 'POST',
        body: message
      });
    }

    form.onsubmit = function() {
      let message = form.message.value;
      if (message) {
        form.message.value = '';
        sendMessage(message);
      }
      return false;
    };
  }

  // Receiving messages with long polling
  function SubscribePane(elem, url) {

    function showMessage(message) {
      let messageElem = document.createElement('div');
      messageElem.append(message);
      elem.append(messageElem);
    }

    async function subscribe() {
      let response = await fetch(url);

      if (response.status == 502) {
        // Connection timeout
        // happens when the connection was pending for too long
        // let's reconnect
        await subscribe();
      } else if (response.status != 200) {
        // Show Error
        showMessage(response.statusText);
        // Reconnect in one second
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
      } else {
        // Got message
        let message = await response.text();
        showMessage(message);
        await subscribe();
      }
    }

    subscribe();

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
