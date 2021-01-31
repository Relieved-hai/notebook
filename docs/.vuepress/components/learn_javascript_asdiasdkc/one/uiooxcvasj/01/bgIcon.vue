<template>
  <div>
    <span class="mid" :style="{ 'font-weight': fontWeight }">{{ beforeText }}</span>
    <span class="mid devtools" :style="{ 'background-position': bgPos }"></span>
    <span class="mid" :style="{ 'font-weight': fontWeight }">{{ afterText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    bgPos: String,
    beforeText: String,
    afterText: String,
    fontWeight: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>
.devtools {
  display: inline-block;
  background-image: url(images/largeIcons.svg);
  height: 18px;
  width: 18px;
}

.mid {
  line-height: 1.7;
  font-weight: bold;
  vertical-align: middle;
}
</style>
