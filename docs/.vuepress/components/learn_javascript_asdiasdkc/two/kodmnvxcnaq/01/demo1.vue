<template>
  <div class="h-b">
    <input @mousedown="logMouse"
           @mouseup="logMouse"
           @click="logMouse"
           @contextmenu="logMouse"
           @dblclick="logMouse"
           type="button"
           value="Click me with the right or the left mouse button">

    <input @click="logClear('test')" value="Clear" type="button">

    <form id="testform" name="testform" style="margin-top: 10px">
      <textarea class="textarea"/>
    </form>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      timer: 0
    }
  },
  methods: {
    logMouse(e) {
      let evt = e.type;
      while (evt.length < 11) evt += ' ';
      this.showmesg(evt + " button=" + e.button, 'test')
      return false;
    },
    logClear(form) {
      this.timer = 0;
      document.forms[form + 'form'].getElementsByTagName('textarea')[0].value = '';
    },
    showmesg(t, form) {
      if (!this.timer) this.timer = new Date();

      let tm = new Date();

      if (tm - this.timer > 300) t = '------------------------------\n' + t;

      let area = document.forms[form + 'form'].getElementsByTagName('textarea')[0];
      area.value += t + '\n';
      area.scrollTop = area.scrollHeight;

      this.timer = tm;
    }
    // keyval(n) {
    //   if (n == null) return 'undefined';
    //   let s = '' + n;
    //   if (n >= 32 && n < 127) s += ' ' + String.fromCharCode(n);
    //   while (s.length < 6) s += ' ';
    //   return s;
    // }
  }
}
</script>

<style scoped>
.textarea {
  font-size: 12px;
  height: 150px;
  width: 360px;
}
</style>
