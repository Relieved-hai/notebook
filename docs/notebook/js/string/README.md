## 简体中文排序
```js
const arr = ['上海', '北京', '北1京', '北2京', '北A京', '北b京', 'a', 'b', '啊'];

const fn1 = arr => arr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}))

fn1(arr) // ["啊", "北1京", "北2京", "北京", "北A京", "北b京", "上海", "a", "b"]
```

## URL 对象化
```js
// location.search = "?a=a&b=b"

const fn = new URLSearchParams(location.search.replace(/\?/ig, ""))

fn.has('a') // true
fn.get('a') // 'a'


Object.fromEntries(fn) // {a: "a", b: "b"}
```

## 去除左右空格
```js
const str = "   string   ";

// trimStart() 方法从字符串的开头删除空格。trimLeft()是此方法的别名
console.log(str.trimStart());    // => "string   "
console.log(str.trimEnd());      // => "   string"

// 相同结果
console.log(str.trimLeft());     // => "string   "
console.log(str.trimRight());    // => "   string"
```

## 随机生成 ID
```js
const fn = len => Math.random().toString(36).substr(3, len)

console.log(fn(6)) 
```

## 生成随机 HEX 色值
```js
const fn = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");

console.log(fn())
// color => "#f03665"
```

## 生成星级评分
```js
const fn = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);

console.log(fn(3));
```
