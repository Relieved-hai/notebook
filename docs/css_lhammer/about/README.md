## 关于

作为一名Web开发者，CSS是必备技能之一，我一直以为自己对CSS的掌握已经够用了，直到读[Lea Verou](https://lea.verou.me/about/)的[《CSS揭秘》](https://item.jd.com/11911279.html)，我发现自己充其量就算个会打CS的选手，书中针对我们常见的网页设计难题从不同的角度提出了多种实用又优雅的解决方案，在这里强烈的推荐给每一位从事前端相关工作和对前端有兴趣的同学，相信你一定会有所收获。

<br/>

在 MDN 中 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 的定义：

> 层叠样式表 (Cascading Style Sheets，缩写为 CSS），是一种样式表语言，用来描述 HTML 或 XML（包括如 SVG、XHTML 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。

<br/>
<br/>
<br/>

## 原则

减少代码重复，保持代码的DRY

```css
/* bad~bad~bad~ */

tips {
  color: #f4f0ea;
  border: 1px solid #f4f0ea;
}
tips:before {
  border-left-color: #f4f0ea;
}

/* good~good~good~ */

tips {
  color: #f4f0ea;
  border: 1px solid currentColor;
}
tips:before {
  border-left-color: inherit;
}
```

<br/>

合理使用简写

```scss
/* bad~bad~bad~ */

div {
  border-width: 2px 2px 2px 0;
}

/* good~good~good~ */

div {
  border-width: 2px;
  border-left-width: 0;
}
```

<br/>

适当的过渡效果

```scss
/* bad~bad~bad~ */

input:not(:focus) + .popTips{
  display: none;
}

input:focus + .popTips{
  display: block;
}

/* good~good~good~ */

input:not(:focus) + .popTips{
  transform: scale(0);
  transition: transform .25s cubic-bezier(.25, .1, .25, .1);
}

input:focus + .popTips{
  transform: scale(1);
  transition: transform .4s cubic-bezier(.29, .15, .5, 1.46);
}
```
