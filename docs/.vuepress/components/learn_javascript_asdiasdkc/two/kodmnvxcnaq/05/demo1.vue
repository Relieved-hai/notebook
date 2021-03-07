<template>
  <div class="h-b">
    <form id="demo1form5" onsubmit="return false">

      Prevent default for:
      <label>
        <input type="checkbox" name="keydownStop" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;
      <label>

        <input type="checkbox" name="keyupStop" value="1"> keyup</label>

      <p>
        Ignore:
        <label>
          <input type="checkbox" name="keydownIgnore" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;
        <label>
          <input type="checkbox" name="keyupIgnore" value="1"> keyup</label>
      </p>

      <p>Focus on the input field and press a key.</p>

      <input autocomplete="off" type="text" placeholder="Press keys here" id="kinput">

      <textarea id="demo1area5"></textarea>
      <input type="button" value="Clear" onclick="demo1area5.value = ''"/>
    </form>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    this.$nextTick(() => {
      kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

      let lastTime = Date.now();

      function handle(e) {
        if (demo1form5.elements[e.type + 'Ignore'].checked) return;

        let text = e.type +
          ' key=' + e.key +
          ' code=' + e.code +
          (e.shiftKey ? ' shiftKey' : '') +
          (e.ctrlKey ? ' ctrlKey' : '') +
          (e.altKey ? ' altKey' : '') +
          (e.metaKey ? ' metaKey' : '') +
          (e.repeat ? ' (repeat)' : '') +
          "\n";

        if (demo1area5.value && Date.now() - lastTime > 250) {
          demo1area5.value += new Array(81).join('-') + '\n';
        }
        lastTime = Date.now();

        demo1area5.value += text;

        if (demo1form5.elements[e.type + 'Stop'].checked) {
          e.preventDefault();
        }

        demo1area5.scrollTop = 1e9;
      }
    })
  }
}
</script>

<style scoped>
#kinput {
  font-size: 150%;
  box-sizing: border-box;
  width: 95%;
}

#demo1area5 {
  width: 95%;
  box-sizing: border-box;
  height: 250px;
  border: 1px solid black;
  display: block;
}

form label {
  display: inline;
  white-space: nowrap;
}
</style>
