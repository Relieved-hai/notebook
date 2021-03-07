<template>
  <div class="h-b">
    <form id="formtqzgtqwzxdf">
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
      formtqzgtqwzxdf.addEventListener("focusin", () => formtqzgtqwzxdf.classList.add('focusedzxcrfgbt'));
      formtqzgtqwzxdf.addEventListener("focusout", () => formtqzgtqwzxdf.classList.remove('focusedzxcrfgbt'));
    })
  }
}
</script>

<style scoped>
.focusedzxcrfgbt {
  outline: 1px solid red;
}
</style>
