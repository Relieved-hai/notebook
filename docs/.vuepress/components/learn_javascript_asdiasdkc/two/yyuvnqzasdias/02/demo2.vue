<template>
  <div class="h-b">
    Your email please: <input type="email" id="inputxcvs">
    <input type="text" style="width:260px" placeholder="make email invalid and try to focus here">
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    this.$nextTick(() => {
      inputxcvs.onblur = function () {
        if (!this.value.includes('@')) { // not email
          // 显示 error
          this.classList.add("error");
          // ...将焦点放回来
          inputxcvs.focus();
        } else {
          this.classList.remove("error");
        }
      };
    })
  }
}
</script>

<style scoped>
.error {
  background: red;
}
</style>
