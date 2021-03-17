<template>
  <div class="h-b">
    <textarea id="areiouooucoa" style="width:80%; height:60px">
    Focus on me, the cursor will be at position 10.
    </textarea>
  </div>
</template>

<script>
export default {
  name: "demo6",
  mounted() {
    areiouooucoa.onfocus = () => {
      // 设置零延迟 setTimeout 以在浏览器 "focus" 行为完成后运行
      setTimeout(() => {
        // 我们可以设置任何选择
        // 如果 start=end，则光标就会在该位置
        areiouooucoa.selectionStart = areiouooucoa.selectionEnd = 10;
      });
    };
  }
}
</script>
