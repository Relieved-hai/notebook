<template>
  <div class="h-b">
    <div id="parent">parent
      <div id="child">child</div>
    </div>
    <textarea id="text"/>
    <input @click="clearText" value="Clear" type="button">
  </div>
</template>

<script>
export default {
  name: "demo2",
  data() {
    return {
      lastMessageTime: 0,
      lastMessage: "",
      repeatCounter: 1
    }
  },
  mounted() {
    this.$nextTick(() => {
      let parent = document.getElementById('parent');
      parent.onmouseover = parent.onmouseout = parent.onmousemove = this.handler;
    })
  },
  methods: {
    handler(event) {
      let type = event.type;
      while (type < 11) type += ' ';

      this.log(type + " target=" + event.target.id)
      return false;
    },
    clearText() {
      text.value = "";
      this.lastMessage = "";
    },
    log(message) {
      if (this.lastMessageTime === 0) this.lastMessageTime = new Date();

      let time = new Date();

      if (time - this.lastMessageTime > 500) {
        message = '------------------------------\n' + message;
      }

      if (message === this.lastMessage) {
        this.repeatCounter++;
        if (this.repeatCounter === 2) {
          text.value = text.value.trim() + ' x 2\n';
        } else {
          text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + this.repeatCounter + "\n";
        }

      } else {
        this.repeatCounter = 1;
        text.value += message + "\n";
      }

      text.scrollTop = text.scrollHeight;

      this.lastMessageTime = time;
      this.lastMessage = message;
    }
  }
}
</script>

<style scoped>
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
</style>
