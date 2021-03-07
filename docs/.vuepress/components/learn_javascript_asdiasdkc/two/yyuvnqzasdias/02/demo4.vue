<template>
  <div class="h-b">
    <!-- on focusing in the form -- add the class -->
    <form onfocus="this.className='focusedlsdq'">
      <input type="text" name="name" value="Name" autocomplete="off">
      <input type="text" name="surname" value="Surname" autocomplete="off">
    </form>
  </div>
</template>

<script>
export default {
  name: "demo2"
}
</script>

<style scoped>
.focusedlsdq { outline: 1px solid red; }
</style>
