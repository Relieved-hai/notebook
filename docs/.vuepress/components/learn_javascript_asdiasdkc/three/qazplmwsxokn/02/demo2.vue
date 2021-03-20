<template>
  <div class="h-b">

    <form id="formasdqwe">
      <input type="text" placeholder="Enter message" name="message">
      <input type="submit" value="Click to send">
    </form>

    <iframe src="/learn_javascript_asdiasdkc/three/qazplmwsxokn/02/iframe.html" id="ifasdasdrame" style="display:block; height:60px"/>
  </div>
</template>

<script>
export default {
  mounted() {
    formasdqwe.onsubmit = function () {
      ifasdasdrame.contentWindow.postMessage(this.message.value, '*');
      return false;
    };
  }
}
</script>

