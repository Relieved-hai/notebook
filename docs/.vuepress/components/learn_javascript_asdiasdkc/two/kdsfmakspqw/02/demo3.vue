<template>
  <div class="body h-b">
    A click shows both <code>event.target</code> and <code>this</code> to compare:

    <form class="form" id="form">FORM
      <div class="div">DIV
        <p class="p">P</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('form').onclick = function (event) {
        event.target.style.backgroundColor = 'yellow';
        // chrome needs some time to paint yellow
        setTimeout(() => {
          alert("target = " + event.target.tagName + ", this=" + this.tagName);
          event.target.style.backgroundColor = '';
        }, 0);
      };
    })
  }
}
</script>

<style scoped>

.form {
  background-color: green;
  position: relative;
  width: 150px;
  height: 150px;
  text-align: center;
  cursor: pointer;
}

.div {
  background-color: blue;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 100px;
  height: 100px;
}

.p {
  background-color: red;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0;
}

.body {
  line-height: 25px;
  font-size: 16px;
}
</style>
