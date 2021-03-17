<template>
  <div class="h-b">
    <p id="highlight-demoasdasd">
      一个具有
      <code>id="highlight-demo"</code>
      的示例元素，运行上面那段代码来观察它。
    </p>

    <button @click="one">运行上面的例子</button>
    <button @click="two">运行下面的例子</button>
  </div>
</template>

<script>
import Prism from 'prismjs'

export default {
  name: "demo1",
  mounted() {
  },
  methods: {
    one() {
      let observer = new MutationObserver(mutations => {

        for (let mutation of mutations) {
          // 检查新节点，有什么需要高亮显示的吗？

          for (let node of mutation.addedNodes) {
            // 我们只跟踪元素，跳过其他节点（例如文本节点）
            if (!(node instanceof HTMLElement)) continue;

            // 检查插入的元素是否为代码段
            if (node.matches('pre[class*="language-"]')) {
              Prism.highlightElement(node);
            }

            // 或者可能在子树的某个地方有一个代码段？
            for (let elem of node.querySelectorAll('pre[class*="language-"]')) {
              Prism.highlightElement(elem);
            }
          }
        }

      });

      let demoElem = document.getElementById('highlight-demoasdasd');

      observer.observe(demoElem, { childList: true, subtree: true });
    },
    two() {
      let demoElem = document.getElementById('highlight-demoasdasd');

      // 动态插入带有代码段的内容
      demoElem.innerHTML = `下面是一个代码段：
        <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
        <div>另一个代码段：</div>
        <div>
          <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
        </div>
      `;
    }
  }
}
</script>

<style scoped>

</style>
