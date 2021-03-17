<template>
  <div class="h-b">
    点击按钮运行所选内容上的方法，点击 "resetExample" 进行重置。

    <p id="pqwieoqwje">Example: <i>italic</i> and <b>bold</b></p>

    <p id="resultasdasd"></p>

    <div>
      <button @click="deleteContents">deleteContents</button>
    </div>

    <div>
      <button @click="extractContents">extractContents</button>
    </div>

    <div>
      <button @click="cloneContents">cloneContents</button>
    </div>

    <div>
      <button @click="insertNode">insertNode</button>
    </div>

    <div>
      <button @click="surroundContents">surroundContents</button>
    </div>

    <div>
      <button @click="resetExample">resetExample</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "demo2",
  data() {
    return {
      range: new Range()
    }
  },
  mounted() {
    this.resetExample();
  },
  methods: {
    deleteContents() {
      this.range.deleteContents()
    },
    extractContents() {
      let content = this.range.extractContents();
      resultasdasd.innerHTML = "";
      resultasdasd.append("extracted: ", content);
    },
    cloneContents() {
      let content = this.range.cloneContents();
      resultasdasd.innerHTML = "";
      resultasdasd.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      this.range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        this.range.surroundContents(newNode);
      } catch (e) {
        alert(e)
      }
    },
    resetExample() {
      pqwieoqwje.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      resultasdasd.innerHTML = "";

      this.range.setStart(pqwieoqwje.firstChild, 2);
      this.range.setEnd(pqwieoqwje.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();
      window.getSelection().addRange(this.range);
    }
  }
}
</script>
