<template>
  <div class="h-b">
    <table id="tableaaa"
           @mouseover="overLogMess"
           @mouseout="outLogMess">
      <tr>
        <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
      </tr>
      <tr>
        <td class="nw"><strong>Northwest</strong>
          <br>Metal
          <br>Silver
          <br>Elders
        </td>
        <td class="n"><strong>North</strong>
          <br>Water
          <br>Blue
          <br>Change
        </td>
        <td class="ne"><strong>Northeast</strong>
          <br>Earth
          <br>Yellow
          <br>Direction
        </td>
      </tr>
      <tr>
        <td class="w"><strong>West</strong>
          <br>Metal
          <br>Gold
          <br>Youth
        </td>
        <td class="c"><strong>Center</strong>
          <br>All
          <br>Purple
          <br>Harmony
        </td>
        <td class="e"><strong>East</strong>
          <br>Wood
          <br>Blue
          <br>Future
        </td>
      </tr>
      <tr>
        <td class="sw"><strong>Southwest</strong>
          <br>Earth
          <br>Brown
          <br>Tranquility
        </td>
        <td class="s"><strong>South</strong>
          <br>Fire
          <br>Orange
          <br>Fame
        </td>
        <td class="se"><strong>Southeast</strong>
          <br>Wood
          <br>Green
          <br>Romance
        </td>
      </tr>

    </table>

    <textarea id="textbbb" v-model="val"></textarea>

    <input type="button" @click="val=''" value="Clear">
  </div>
</template>

<script>
export default {
  name: "demo5",
  data() {
    return {
      val: '',
      currentElem: null
    }
  },
  methods: {
    overLogMess(event) {
      // 在进入一个新的元素前，鼠标总是会先离开前一个元素
      // 如果设置了 currentElem，那么我们就没有鼠标所悬停在的前一个 <td>，
      // 忽略此事件
      if (this.currentElem) return;

      let target = event.target.closest('td');

      // 我们移动到的不是一个 <td> —— 忽略
      if (!target) return;

      // 现在移动到了 <td> 上，但在处于了我们表格的外部（可能因为是嵌套的表格）
      // 忽略
      if (!document.getElementById('tableaaa').contains(target)) return;

      // 给力！我们进入了一个新的 <td>
      this.currentElem = target;
      this.onEnter(this.currentElem);
    },
    outLogMess(event) {
      // 如果我们现在处于所有 <td> 的外部，则忽略此事件
      // 这可能是一个表格内的移动，但是在 <td> 外，
      // 例如从一个 <tr> 到另一个 <tr>
      if (!this.currentElem) return;

      // 我们将要离开这个元素 —— 去哪儿？可能是去一个后代？
      let relatedTarget = event.relatedTarget;

      while (relatedTarget) {
        // 到父链上并检查 —— 我们是否还在 currentElem 内
        // 然后发现，这只是一个内部移动 —— 忽略它
        if (relatedTarget == this.currentElem) return;

        relatedTarget = relatedTarget.parentNode;
      }

      // 我们离开了 <td>。真的。
      this.onLeave(this.currentElem);
      this.currentElem = null;
    },
    // 任何处理进入/离开一个元素的函数
    onEnter(elem) {
      elem.style.background = 'pink';

      // 在文本区域显示它
      this.val += `over -> ${this.currentElem.tagName}.${this.currentElem.className}\n`;
      textbbb.scrollTop = 1e6;
    },
    onLeave(elem) {
      elem.style.background = '';

      // 在文本区域显示它
      this.val += `out <- ${elem.tagName}.${elem.className}\n`;
      textbbb.scrollTop = 1e6;
    }
  }
}
</script>

<style scoped>
#textbbb {
  display: block;
  height: 100px;
  width: 456px;
}

#tableaaa th {
  text-align: center;
  font-weight: bold;
}

#tableaaa td {
  width: 150px;
  white-space: nowrap;
  text-align: center;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 12px;
  cursor: pointer;
}

#tableaaa .nw {
  background: #999;
}

#tableaaa .n {
  background: #03f;
  color: #fff;
}

#tableaaa .ne {
  background: #ff6;
}

#tableaaa .w {
  background: #ff0;
}

#tableaaa .c {
  background: #60c;
  color: #fff;
}

#tableaaa .e {
  background: #09f;
  color: #fff;
}

#tableaaa .sw {
  background: #963;
  color: #fff;
}

#tableaaa .s {
  background: #f60;
  color: #fff;
}

#tableaaa .se {
  background: #0c3;
  color: #fff;
}

#tableaaa .highlight {
  background: red;
}
</style>
