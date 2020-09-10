## 加法函数
``` js
//因为JS小数计算 丢失精度
const add = (arg1, arg2) => { 
    let r1, r2, m; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)) 
    return (arg1 * m + arg2 * m) / m 
}
```

## 减法函数
``` js
// 减法函数（因为JS小数计算 丢失精度）
const sub = (arg1, arg2) => { 
    let r1, r2, m, n; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2; 
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n)); 
}
```

## 数字转千分位
```js
const fn1 = num => (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

const fn2 = num => num.toLocaleString('en-US');
```

## RGB 颜色转 16进制颜色
```js
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
RGBToHex(255, 255, 255); // 'ffffff'
```

## 生成随机数
```js
const fn = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

fn(1, 10);
```

## 随机生成六位数字验证码
```js
const code = () => Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
```

## 判断奇偶数
```js
const fn1 = num => !!(num & 1)

const fn2 = num => !!(num % 2)

fn1(3) // true

fn2(3) // true
```

## 取整
```js
const fn1 = num => num | 0
```

## 指定位数的小数
```js
const fn1 = (num, decimals = 0) => Number(`${Math.round(`${num}e${decimals}`)}e-${decimals}`)
```

## 数字补0
```js
const fn1 = num => (`0${num}`).slice(-2)

const fn2 = (num, len = 2) => (`${num}`).padStart(len, '0')
```

## 双位运算符
> 双否定位操作符（ ~~ ）的优势在于它执行相同的操作运行速度更快。
- 替代正数的向下取整 `Math.floor()`
- 替代负数的向上取整 `Math.ceil()`

```js
~~4.5 // 4
Math.floor(4.5) // 4
Math.ceil(4.5)  // 5

~~-4.5 // 4
Math.floor(-4.5) // -5
Math.ceil(-4.5) // -4
```

## 强转为数字
> 只对null、""、false、数值字符串有效

```js
'6' * 1 // 6
'a' * 1 // NaN
'' * 1 // 0
null * 1 // 0
undefined * 1 // NaN
false * 1 // 0
NaN * 1 // NaN


+ '6' // 6
+ 'a' // NaN
+ '' // 0
+ false // 0
+ NaN // NaN
+ undefined // NaN
```
