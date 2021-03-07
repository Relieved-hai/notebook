<template>
  <div class="h-b">
    <div id="container">
      <div class="smiley-green">
        <div class="left-eye"/>
        <div class="right-eye"/>
        <div class="smile"/>
      </div>

      <div class="smiley-yellow">
        <div class="left-eye"/>
        <div class="right-eye"/>
        <div class="smile"/>
      </div>

      <div class="smiley-red">
        <div class="left-eye"/>
        <div class="right-eye"/>
        <div class="smile /"></div>
      </div>
    </div>

    <textarea id="log" style="min-width: 100%; max-width: 100%">Events will show up here! </textarea>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      const _dom = document.getElementById('container')
      _dom.onmouseover = _dom.onmouseout = this.handler;
    })
  },
  methods: {
    handler(event) {
      function str(el) {
        if (!el) return "null"
        return el.className || el.tagName;
      }

      const log = document.getElementById('log')

      log.value += event.type + ':  ' + 'target=' + str(event.target) + ',  relatedTarget=' + str(event.relatedTarget) + "\n";
      log.scrollTop = log.scrollHeight;

      if (event.type === 'mouseover') event.target.style.background = 'pink'

      if (event.type === 'mouseout') event.target.style.background = ''
    }
  }
}
</script>

<style scoped>

#container {
  border: 1px solid brown;
  padding: 10px;
  width: 330px;
  margin-bottom: 5px;
  box-sizing: border-box;
}

#log {
  height: 120px;
  width: 350px;
  display: block;
  box-sizing: border-box;
}

[class^="smiley-"] {
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
}

.smiley-green {
  background: #a9db7a;
  border: 5px solid #92c563;
  position: relative;
}

.smiley-green .left-eye {
  width: 18%;
  height: 18%;
  background: #84b458;
  position: relative;
  top: 29%;
  left: 22%;
  border-radius: 50%;
  float: left;
}

.smiley-green .right-eye {
  width: 18%;
  height: 18%;
  border-radius: 50%;
  position: relative;
  background: #84b458;
  top: 29%;
  right: 22%;
  float: right;
}

.smiley-green .smile {
  position: absolute;
  top: 67%;
  left: 16.5%;
  width: 70%;
  height: 20%;
  overflow: hidden;
}

.smiley-green .smile:after,
.smiley-green .smile:before {
  content: "";
  position: absolute;
  top: -50%;
  left: 0%;
  border-radius: 50%;
  background: #84b458;
  height: 100%;
  width: 97%;
}

.smiley-green .smile:after {
  background: #84b458;
  height: 80%;
  top: -40%;
  left: 0%;
}

.smiley-yellow {
  background: #eed16a;
  border: 5px solid #dbae51;
  position: relative;
}

.smiley-yellow .left-eye {
  width: 18%;
  height: 18%;
  background: #dba652;
  position: relative;
  top: 29%;
  left: 22%;
  border-radius: 50%;
  float: left;
}

.smiley-yellow .right-eye {
  width: 18%;
  height: 18%;
  border-radius: 50%;
  position: relative;
  background: #dba652;
  top: 29%;
  right: 22%;
  float: right;
}

.smiley-yellow .smile {
  position: absolute;
  top: 67%;
  left: 19%;
  width: 65%;
  height: 14%;
  background: #dba652;
  overflow: hidden;
  border-radius: 8px;
}

.smiley-red {
  background: #ee9295;
  border: 5px solid #e27378;
  position: relative;
}

.smiley-red .left-eye {
  width: 18%;
  height: 18%;
  background: #d96065;
  position: relative;
  top: 29%;
  left: 22%;
  border-radius: 50%;
  float: left;
}

.smiley-red .right-eye {
  width: 18%;
  height: 18%;
  border-radius: 50%;
  position: relative;
  background: #d96065;
  top: 29%;
  right: 22%;
  float: right;
}

.smiley-red .smile {
  position: absolute;
  top: 57%;
  left: 16.5%;
  width: 70%;
  height: 20%;
  overflow: hidden;
}

.smiley-red .smile:after,
.smiley-red .smile:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  border-radius: 50%;
  background: #d96065;
  height: 100%;
  width: 97%;
}

.smiley-red .smile:after {
  background: #d96065;
  height: 80%;
  top: 60%;
  left: 0%;
}

</style>
