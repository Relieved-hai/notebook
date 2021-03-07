# 聚焦：focus/blur

当用户点击某个元素或使用键盘上的 <kbd>Tab</kbd> 键选中时，该元素将会获得聚焦（focus）。还有一个 HTML 特性（attribute）`autofocus` 可以让焦点在网页加载时默认落在一个元素上，此外还有其它途径可以获得焦点。

聚焦到一个元素通常意味着：“准备在此处接受数据”，所以，这正是我们可以运行代码以初始化所需功能的时刻。

失去焦点的时刻（“blur”）可能更为重要。它可能发生在用户点击页面的其它地方，或者按下 <kbd>Tab</kbd> 键跳转到下一个表单字段，亦或是其它途径的时候。

失去焦点通常意味着：“数据已经输入完成”，所以我们可以运行代码来检查它，甚至可以将其保存到服务器上，或进行其他操作。

当处理焦点事件时，有一些重要的特性。我们将尽力把这些内容介绍完整。

<br/>
<br/>
<br/>

## focus/blur 事件

当元素聚焦时，会触发 `focus` 事件，当元素失去焦点时，会触发 `blur` 事件。

让我们使用它们来校验一个 `input` 字段。

在下面这个示例中：

- `blur` 事件处理程序检查这个字段是否输入了电子邮箱，如果没有输入，则显示一个 error。
- `focus` 事件处理程序隐藏 error 信息（在 `blur` 事件处理程序上会被再检查一遍）：

```html
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // 移除 "error" 指示，因为用户想要重新输入一些内容
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```























<br/>
<br/>
<br/>

## focus/blur 方法































<br/>
<br/>
<br/>

## 允许在任何元素上聚焦：tabindex































<br/>
<br/>
<br/>

## focus/blur 委托































<br/>
<br/>
<br/>

## 总结































<br/>
<br/>
<br/>
