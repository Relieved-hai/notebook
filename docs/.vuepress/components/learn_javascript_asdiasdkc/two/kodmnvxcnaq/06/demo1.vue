<template>
  <div></div>
</template>

<script>
export default {
  name: "demo1",
  mounted() {
    window.addEventListener('scroll', this.inner);
  },
  methods: {
    inner() {
      this.$nextTick(() => {
        const xcvsdawe = document.getElementById('showScrollDemo');
        xcvsdawe && (xcvsdawe.innerHTML = window.pageYOffset + 'px');
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.inner);
  }
}
</script>

<style scoped>

</style>
