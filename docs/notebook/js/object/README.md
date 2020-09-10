## 判断是否是对象
```js
let _toString = Object.prototype.toString;

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}
```

## 判断类型
```js
const isType = type => obj => {
  return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
}

isType('String')('123');		// true
isType('Array')([1, 2, 3]);	// true
isType('Number')(123);			// true
isType('Object')({});			// true
```

## 对象合并
```js
let o1 = {
  a: 'a',
  b: {
    b1: [],
    b2: {},
    b3: 'b3'
  }
}
let o2 = {
  a: 'b'
}

/**
* Example 1
*/
console.log({...o1, ...o2})

// 通过扩展运算符（...）能很方便平时的开发，例如在获取环境变量时
const env = xxx;
const link = {
    dev: "Dev",
    test: "Test",
    prod: "Prod"
}[env];
// link : Dev


/**
* Example 2
*/
console.log(Object.assign({}, o1, o2))
```

## 拷贝
```js
let obj1 = { a: 0 , b: { c: 0 }, d: undefined, f: function() {} };

/**
* Example 1
*/
const obj2 = {...obj1}

/**
* Example 2
* 缺点： 1、对象必须遵从JSON的格式
*       2、undefined、function、symbol 会在转换过程中被忽略
*/
JSON.parse(JSON.stringify(obj1))

/*
* Example 3
* 缺点: 因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
* */
let obj2 = Object.assign({}, obj1);

obj1.a = 1;
obj2.a = 2;
obj2.b.c = 3;

console.log(obj2.b.c); // 3


/**
* Example 4
*/
const deepClone = obj => {
  // 判断复制的目标是数组还是对象
  const targetObj = obj.constructor === Array ? [] : {};

  for(let keys in obj){
    if(obj.hasOwnProperty(keys)) {
      // 如果值是对象，就递归一下
      if(obj[keys] && typeof obj[keys] === 'object') {
        targetObj[keys] = obj[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(obj[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = obj[keys];
      }
    }
  }
  return targetObj;
}

/*
* Example 5
* */
function deepClone(obj) {
  let copy;

  if (null == obj || "object" != typeof obj) return obj;

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments);
    }
    return copy;
  }

  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}
```

## 是否为空对象
```js
const fn1 = obj => JSON.stringify(obj) === '{}'
```

## 是否为普通对象
```js
const fn1 = obj => Object.prototype.toString.call(obj) === '[object Object]'
```

## 对象转数组
```js
const obj = {a: 1, b: 2, c: 3};

console.log(Object.entries(obj));
// => [["a", 1], ["b", 2], ["c", 3]]
```

## 是否为空对象
```js
const fn = obj => JSON.stringify(obj) === '{}' && !Object.keys(obj).length;

fn({})
```

``` js
firstLoop:
for (let i = 0; i < 3; i++) {
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue firstLoop; // 继续 firstLoop 循环
         // break firstLoop; // 中止 firstLoop 循环
      }
      console.log(`+++++++++ i = ${i}, j = ${j}`);
   }
};

for (let i = 0; i < 3; i++) {
   for (let j = 0; j < 3; j++) {
      if (i === j) {
         continue
      }
      console.log(`--------- i = ${i}, j = ${j}`);
   }
}
```

## 判断两个对象的值是否一样
```js
function isObject (obj){
  return obj !== null && typeof obj === 'object'
}

function looseEqual (a, b) {
  // 如果是同一个对象，则相同
  if (a === b) return true
  // 判断是否是对象
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  // 两者都是对象
  if (isObjectA && isObjectB) {
    try {
      // 判断是否是数组
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      // 两者都是数组
      if (isArrayA && isArrayB) {
        // 长度要一样，同时每一项都要相同，递归调用
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {  // 如果都是时间对象，则需要保证时间戳相同
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) { // 两者都不是数组，则为对象
        // 拿到两者的key值，存入数组
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        // 属性的个数要一样，递归的判断每一个值是否相同
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {  // 两者都不是对象
    // 转成字符串后，值是否一致
    return String(a) === String(b)
  } else {
    return false
  }
}
```
