<template>
  <div class="h-b">
    <pre id="rabbit" style="background-color: #fff;">
      |\   /|
       \|_|/
       /. .\
      =\_Y_/=
       {>o<}
    </pre>
    <button @click="hide">Hide()</button>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      rabbit: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.rabbit = document.getElementById('rabbit')
      this.rabbit.addEventListener('hide', function (event) {
        if (confirm("Call preventDefault?")) {
          event.preventDefault();
        }
      });
    })
  },
  methods: {
    hide() {
      let event = new CustomEvent("hide", {
        cancelable: true // 没有这个标志，preventDefault 将不起作用
      });
      if (!this.rabbit.dispatchEvent(event)) {
        alert('The action was prevented by a handler');
      } else {
        this.rabbit.hidden = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
