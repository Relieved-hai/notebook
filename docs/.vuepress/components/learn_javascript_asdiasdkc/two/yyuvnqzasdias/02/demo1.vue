<template>
  <div class="h-b">
    Your email please: <input type="email" id="inputaisdo">

    <div id="erroraisdo"></div>
  </div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    this.$nextTick(() => {
      inputaisdo.onblur = function () {
        if (!inputaisdo.value.includes('@')) { // not email
          inputaisdo.classList.add('invalid');
          erroraisdo.innerHTML = 'Please enter a correct email.'
        }
      };

      inputaisdo.onfocus = function () {
        if (this.classList.contains('invalid')) {
          // 移除 "error" 指示，因为用户想要重新输入一些内容
          this.classList.remove('invalid');
          erroraisdo.innerHTML = "";
        }
      };
    })
  }
}
</script>

<style scoped>
.invalid {
  border-color: red;
}

#error {
  color: red
}
</style>
