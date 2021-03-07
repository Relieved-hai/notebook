<template>
  <div class="h-b">
    <div id="parent" @mouseover="mouselog" @mouseout="mouselog">parent
      <div id="child">child</div>
    </div>

    <textarea id="text" v-model="val" style="min-width: 100%; max-width: 100%"/>

    <input type="button" @click="val = ''" value="Clear">
  </div>
</template>

<script>
export default {
  name: "demo2",
  data() {
    return {
      lastMessageTime: 0,
      lastMessage: "",
      repeatCounter: 1,
      val: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      let parent = document.getElementById('parent');
      parent.onmouseover = parent.onmouseout = parent.onmousemove = this.handler;
    })
  },
  methods: {
    mouselog(event) {
      const _dom = document.getElementById('text')

      let d = new Date();

      this.val += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
      _dom.scrollTop = _dom.scrollHeight;
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
