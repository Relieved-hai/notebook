<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'mounted',
  mounted() {
    window.checkPhoneKey5 = function checkPhoneKey(key) {
      return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
    }

    window.checkPhoneKey6 = function checkPhoneKey(key) {
      return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
        key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
    }
  }
}
</script>
