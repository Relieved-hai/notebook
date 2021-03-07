<template>
  <div class="h-b">
    <form id="formtefvhns">
      <input type="text" name="name" value="Name" autocomplete="off">
      <input type="text" name="surname" value="Surname" autocomplete="off">
    </form>
  </div>
</template>

<script>
export default {
  name: "demo2",
  mounted() {
    this.$nextTick(() => {
      // 将处理程序置于捕获阶段（最后一个参数为 true）
      formtefvhns.addEventListener("focus", () => formtefvhns.classList.add('focumnbbrfv'), true);
      formtefvhns.addEventListener("blur", () => formtefvhns.classList.remove('focumnbbrfv'), true);
    })
  }
}
</script>

<style scoped>
.focumnbbrfv {
  outline: 1px solid red;
}
</style>
