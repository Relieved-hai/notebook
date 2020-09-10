## 浮动布局 float
<layout-float/>

```html
<div class="layout-float">
  <div class="left"></div>
  <div class="right"></div>
  <div class="center"></div>
</div>
```

```scss
.layout-float {
  div {
    min-height: 100px;
  }
  .left {
    float: left;
    width: 100px;
    background: red;
  }
  .center {
    background: yellow;
  }
  
  .right {
    float: right;
    width: 100px;
    background: blue;
  }
}
```

## 绝对布局 position
<layout-position/>

``` html
<div class="layout-position">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```

```scss
.layout-position {
    & > div {
      min-height: 100px;
      position: absolute;
    }

    .left {
      left: 0;
      width: 100px;
      background: red;
    }

    .center {
      left: 100px;
      right: 100px;
      background: yellow;
    }

    .right {
      right: 0;
      width: 100px;
      background: blue;
    }
  }
```

## 弹性布局 flex
<layout-flex/>

```html
<div class="layout-flex">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```

```scss
.layout-flex {
  display: flex;

  div {
    min-height: 100px;
  }

  .left {
    width: 100px;
    background: red;
  }

  .center {
    flex: 1;
    background: yellow;
  }

  .right {
    width: 100px;
    background: blue;
  }
}
```

## 表格布局 Table

<layout-tabl/>

```html
<div class="layout-table">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```

```scss
.layout-table {
  width: 100%;
  height: 100px;
  display: table;

  & > div {
    display: table-cell;
  }

  .left{
    width: 100px;
    background: red;
  }

  .center {
    background: yellow;
  }

  .right {
    width: 100px;
    background: blue;
  }
}
```

## 网格布局 grid
<layout-grid />

```html
<div class="layout-grid">
  <div class="left"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
```

```scss
.layout-grid {
  width: 100%;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 100px auto 100px;

  & > div {
    display: table-cell;
  }

  .left {
    /*width: 100px;*/
    background: red;
  }

  .center {
    background: yellow;
  }

  .right {
    background: blue;
  }
}
```
