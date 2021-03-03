<template>
  <div class="h-b" id="documentElem1">
    <button data-toggle-id="subscribe-mail">
      Show the subscription form
    </button>
    <form id="subscribe-mail" hidden>
      Your mail: <input type="email">
    </form>
  </div>
</template>

<script>
export default {
  name: "demo",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('documentElem1').addEventListener('click', function (event) {
        let id = event.target.dataset.toggleId;
        if (!id) return;
        let elem = document.getElementById(id);
        elem.hidden = !elem.hidden;
      });
    })
  }
}
</script>
