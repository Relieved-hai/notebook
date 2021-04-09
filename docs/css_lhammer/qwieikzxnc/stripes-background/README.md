# 条纹背景

> 背景知识：[gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient), [linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient()), [radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient()), [repeating-linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeating-linear-gradient())

<br/>
<br/>
<br/>

## 进度条

```html
<style>
  main {
    width: 100%;
    padding: 80px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .progress-outer {
    width: 60%; height: 12px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  .progress-enter {
    height: inherit;
    background: rgba(180, 160, 120, .2);
  }
  .progress-bg {
    width: 60%; height: inherit;
    border-radius: 6px;
    background: repeating-linear-gradient(-45deg, #D9CFBB  25%, #C3B393 0, #C3B393 50%,
                    #D9CFBB 0, #D9CFBB 75%, #C3B393 0);
    background-size: 16px 16px;
    animation: panoramic 20s linear infinite;
  }
  @keyframes panoramic{
    to {
      background-position: 200% 0;
    }
  }
</style>
<main>
  <div class="progress-outer">  <!--更好的扩展-->
    <div class="progress-enter">
      <div class="progress-bg"></div>
    </div>
    <!-- <span>60%</span> -->
  </div>
</main>
```

<ClientOnly>
  <css_lhammer-qwieikzxnc-stripes-background-demo />
</ClientOnly>

<br/>
<br/>
<br/>

## 不规则卡片

![](./images/coupon.jpg)

```html
<style>
  main {
    width: 100%;
    padding: 80px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .coupon-card {
    width: 200px;
    height: 120px;
    background-image: radial-gradient(circle at 100px -8px, transparent 20px, #b4a078 21px);
  }
</style>
<main>
  <div class="coupon-card"></div>
</main>
```

<ClientOnly>
  <css_lhammer-qwieikzxnc-stripes-background-demo2 />
</ClientOnly>

> 示例中为了实现:hover时有贴边的阴影，所以采用了 `radial-gradient`。如果你有更好的办法，欢迎留言~

<br/>
<br/>
<br/>

### 推荐

《CSS揭秘》作者[Lea Verou](https://lea.verou.me/about/)使用CSS3渐变实现的图案库[Patterns Gallery](https://projects.verou.me/css3patterns/#)，还有它的SVG版本[SVG Patterns Gallery](https://philiprogers.com/svgpatterns/)，有兴趣的可以去研究一下作者的实现原理。

<iframe src="https://verou.me/css3patterns" width="100%" height="429px"></iframe>

<br/>
<br/>
<br/>

### 浏览器支持

<br/>

<iframe width="100%" height="436px" frameborder="0" src="https://caniuse.bitsofco.de/embed/index.html?feat=css-gradients&amp;periods=future_1,current,past_1,past_2,past_3&amp;accessible-colours=false"></iframe>

<br/>
<br/>
<br/>
