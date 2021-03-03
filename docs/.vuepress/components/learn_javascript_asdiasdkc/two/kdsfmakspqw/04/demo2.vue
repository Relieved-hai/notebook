<template>
  <div style="border: 1px solid #d6d6d6;">
    <ul id="menu" class="menu">
      <li><a href="/html">HTML</a></li>
      <li><a href="/javascript">JavaScript</a></li>
      <li><a href="/css">CSS</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('menu').onclick = function(event) {
        if (event.target.nodeName != 'A') return;
        let href = event.target.getAttribute('href');
        alert(href);
        // prevent url change
        return false;
      };
    })
  }
}
</script>

<style scoped>

.menu li {
  display: inline-block;
  margin: 0;
}

.menu > li a {
  display: inline-block;
  margin: 0 2px;
  outline: none;
  text-align: center;
  text-decoration: none;
  font: 14px/100% sans-serif;
  padding: .5em 2em .55em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
  border-radius: .5em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  color: #d9eef7;
  border: solid 1px #0076a3;
  background: #0095cd;
}

.menu > li:hover a {
  text-decoration: none;
  background: #007ead;
}
</style>
