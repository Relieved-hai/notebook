## reset.css

<<< ./docs/.vuepress/public/css/reset/reset.css

## input默认填充的背景颜色
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```

## input[type=number]的默认样式
``` css
input[type=number] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
```

## 移动端 a 标签等点击区域变色
``` css
*{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
```

## 移动端 input 样式
``` css
input{
    border: none;
    -moz-appearance:none;
    -webkit-appearance : none ; /*解决ios上按钮的圆角问题*/
    border-radius: 0; /*解决ios上输入框圆角问题*/
    outline:medium; /*去掉鼠标点击的默认黄色边框*/
    background-color: transparent;
}
```

## ios滑动滚动条卡顿
```css
*{
  -webkit-overflow-scrolling : touch
}
```
