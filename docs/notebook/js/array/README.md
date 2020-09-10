## 数组去重
```js
const fn = arr => [...new Set(arr)]

// [...new Set('ababbc')].join('') // abc


// 去重并排序
let fn2 = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(fn2([1,2,1,2,3,5,4,5,3,4,4,4,4])); //[1,2,3,4,5]
```

## 数组合并
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

const fn1 = (arr1, arr2) => [...arr1, ...arr2]

// concat方法（挂载Array原型链上）, 不改变数组本身
const fn2 = (arr1, arr2) => arr1.concat(arr2)
// concat 只是对数组的第一层进行深拷贝

// 方法3：apply方法
Array.prototype.push.apply(a, b);
console.log(a); // [1, 2, 3, 4, 5, 6] 改变原目标数组
console.log(b); // [4, 5, 6]
```

## 数组最小、大值
```js
// 最大
const fn1 = arr => Math.max(...arr)
const fn2 = arr => Math.max.apply(null, arr)

// 最小
const fn1 = arr => Math.min(...arr)
const fn2 = arr => Math.min.apply(null, arr)
```

## 扁平化数组
```js
let arr = [1, [2], [[3,[2, [1]]], 4], 5];

// ES6 数组的flat()，flat() 方法会移除数组中的空项
 /**
* @param {Number} inf 扁平深度，默认任意深度（Infinity）
* @returns {any[]}
*/
const fn1 = (inf = Infinity) => arr.flat(inf)

// 任意深度
const fn2 = arr => [].concat(...arr.map(v => (Array.isArray(v) ? fn2(v) : v)));

// 任意深度
const fn3 = arr1 => arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(fn3(val)) : acc.concat(val), []);
```

## 过滤数组对象
```js
const data = [
  { id: 1, name: 'john', age: 24 },
  { id: 2, name: 'zkp', age: 21 },
  { id: 3, name: 'mike', age: 50 }
];

/**
* @param data 数组对象（一般都JSON那种数组对象）
* @param keys 数组，里面传的是你需要返回的字段
* @param fn 过滤的条件
*/
const reducedFilter = (data, keys, fn) => data.filter(fn).map(el => keys.reduce((acc, key) => {acc[key] = el[key];return acc;}, {}));

reducedFilter(data, ['id', 'name'], item => item.age > 25); // [{ id: 3, name: 'mike'}]
// 注：最后返回结果，不会改变原数组
// 这个在 RESTful API 模式下返回JSON数据的时候还是很常用的，会节省你forEach的的过程
```

## 数组对象去重
```js
let arr = [
  {id: 1, name: '111'},
  {id: 2, name: '222'},
  {id: 3, name: '111'},
  {id: 4, name: '222'}
]

// ES6
/**
* 
* @param arr 去重数组
* @param fn 去重规则，如 (a, b) => a.name === b.name，则是比较 name
* @returns {*}
*/
const uniqueElementsBy = (arr, fn) =>arr.reduce((acc, v) => {if (!acc.some(x => fn(v, x))) acc.push(v);return acc;}, []);

uniqueElementsBy(arr, (a, b) => a.id === b.id)
```

## 两数组的相同、不同元素
```js
// 返回不同的元素
const fn1 = (arr1, arr2) => arr1.filter(v => !arr2.includes(v))

// 返回相同的元素
const fn1 = (arr1, arr2) => arr1.filter(v => arr2.includes(v))
```

## 数组洗牌
```js
/**
* Example 1
*/
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const shuffle = arr => {
  if (arr.length < 1) return arr

  let _arr = arr.slice()
  let i, j

  for (i = 0; i < _arr.length; i++) {
    j = getRandomInt(0, i)
    ;[_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}


/**
* Example 2
*/
const shuffle2 = arr => arr.slice().sort(() => Math.random() - .5);
// shuffle2([1, 2, 3, 4, 5])
```

## 数组中元素出现次数
```js
const arr = ['aaa', 'bbb', 'ccc', 'aaa', 'ccc', 'ddd'];
const fn1 = arr => arr.reduce((obj, name) => {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {})

fn1(arr) // {aaa: 2, bbb: 1, ccc: 2, ddd: 1}
```

## 数组中某元素的出现次数
```js
const fn1 = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
```

## 返回数组第n个元素
```js
const fn1 = (arr, n = 0) => (n >= 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]
```

## 删除数组右边第n个元素
```js
const fn1 = (arr, n = 0) => n < arr.length ? arr.slice(0, arr.length - n) : []
```

## 数组之和
```js
const fn1 = arr => arr.reduce((acc, cur) => acc + cur, 0)

const fn2 = arr => eval(arr.join("+"))
```

## 过滤数组中的假值
```js
const fn1 = arr => arr.filter(Boolean)

const fn2 = arr => arr.filter(item => item)

fn1([0, false, '', NaN, '1', 'e' * 2])
```

## 按属性对object分类
```js
const arr = [
  { oName: 'a', idx: 1 },
  { oName: 'b', idx: 2 },
  { oName: 'b', idx: 1 },
  { oName: 'd', idx: 2 },
  { oName: 'e', idx: 2 },
  { oName: 'f', idx: 1 },
]

const fn1 = (objectArray, property) => objectArray.reduce((acc, obj)=> {
  var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
}, {})

fn1(arr, 'idx')
// {
//  1: [{oName: 'a', idx: 1}, oName: 'b', idx: 1, oName: 'f', idx: 1]
//  2: [{oName: 'b', idx: 2}, oName: 'd', idx: 2, oName: 'e', idx: 2]
// }
```

## 数组转对象
```js
const arr = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(arr);

console.log(obj);    // => {a: 1, b: 2, c: 3}

```

## 是否为空
```js
const arr = []

const fn = Array.isArray(arr) && !arr.length && JSON.stringify(arr) === '[]';
```

## 随机数组成员
```js
const fn = arr => arr[Math.floor(Math.random() * arr.length)];
```
