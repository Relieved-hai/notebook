<template>
  <div class="h-b">
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    Cloned: <span id="clonedqwezxc"></span>
    <br>
    As text: <span id="astextqedcsd"></span>
  </div>
</template>

<script>

export default {
  name: "demo2",
  mounted() {
    document.onselectionchange = function () {
      let selection = document.getSelection();

      clonedqwezxc.innerHTML = astextqedcsd.innerHTML = "";

      // 从范围复制 DOM 节点（这里我们支持多选）
      for (let i = 0; i < selection.rangeCount; i++) {
        clonedqwezxc.append(selection.getRangeAt(i).cloneContents());
      }

      // 获取为文本形式
      astextqedcsd.innerHTML += selection;
    };
  }
}
</script>
