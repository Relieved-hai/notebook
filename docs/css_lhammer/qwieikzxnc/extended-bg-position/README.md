# 背景定位

> 背景知识：[background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position), [background-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin), [calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc())

<br/>

```html
<style>
  main{
    width: 100%;
    padding: 80px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  div{
    width: 229px; height: 139px;
    margin: auto;
    color: #f4f0ea;
    padding: 16px 29px 28px 20px;
    background: #b4a078 url('static/player_logo@2x.png') no-repeat bottom right / 78px 21px;
  }
  div:nth-of-type(1){
    background-position: right 29px bottom 28px;
  }
  div:nth-of-type(2){
    background-origin: content-box;
    margin: 29px 0; /* 移动端纵向排列上下间距 */
  }
  div:nth-of-type(3){
    background-position: calc(100% - 29px) calc(100% - 28px);
  }
</style>
<main>
  <div class="block1">background-position方案</div>
  <div class="block2">background-origin方案</div>
  <div class="block3">calc方案</div>
</main>
```

<ClientOnly>
  <css_lhammer-qwieikzxnc-extended-bg-position-demo />
</ClientOnly>

<br/>
<br/>
<br/>

### 浏览器支持

<br/>

<iframe width="100%" height="436px" frameborder="0" src="https://caniuse.bitsofco.de/embed/index.html?feat=calc&amp;periods=future_1,current,past_1,past_2,past_3&amp;accessible-colours=false"></iframe>

<iframe width="100%" height="480px" frameborder="0" src="https://caniuse.bitsofco.de/embed/index.html?feat=css-background-offsets&amp;periods=future_1,current,past_1,past_2,past_3&amp;accessible-colours=false"></iframe>

<br/>
<br/>
<br/>
