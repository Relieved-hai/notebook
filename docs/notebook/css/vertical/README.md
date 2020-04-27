## 未知父元素高度
```scss
.parent {
  position: relative;
  // 方法1   transform: translateY(-50%);
  .child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  // 方法2
  .child {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

```

## 已知父元素高度，仅有一个子元素
```scss
.parent {
  height: xxx;
  .child {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
```

## 伪元素:before
```scss
.parent {
  display: block;
  &:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .child {
    display: inline-block;
    vertical-align: middle;
  }
}
```

## 隐藏节点
```scss
.parent {
  background: blue;
  width: 100%;
  height: 100px;
  .hide {
    width: 20%;
    height: 35%;//隐藏节点的高为 (父级高 - 去子级高)/2
  }
  .child {
    background: yellow;
    width: 20%;
    height: 30%;
  }
}
```

## display:flex
```scss
.parent {
  display: flex;
  align-items: center
}
```

## display:table-cell
```scss
.parent {
  display: table;
  .child {
    display: table-cell;
    vertical-align: middle;
  }
  .grandson {}
}
```

