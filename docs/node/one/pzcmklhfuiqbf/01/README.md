## 模块概览

在 nodejs 中，path 是个使用频率很高，但却让人又爱又恨的模块。部分因为文档说的不够清晰，部分因为接口的平台差异性。

将 path 的接口按照用途归类，仔细琢磨琢磨，也就没那么费解了。

<br/>
<br/>
<br/>

## 获取路径/文件名/扩展名

- 获取路径：[path.dirname(filepath)](https://nodejs.org/api/path.html#path_path_dirname_path)
- 获取文件名：[path.basename(filepath)](https://nodejs.org/api/path.html#path_path_basename_path_ext)
- 获取扩展名：[path.extname(filepath)](https://nodejs.org/api/path.html#path_path_extname_path)

<br/>
<br/>

### 获取所在路径

例子：

```js
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：/tmp/demo/js
console.log( path.dirname(filepath) );
```

<br/>
<br/>

### 获取文件名

严格意义上来说，`path.basename(filepath)` 只是输出路径的最后一部分，并不会判断是否文件名。

但大部分时候，我们可以用它来作为简易的“获取文件名“的方法。

```js
var path = require('path');

// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );
```

如果只想获取文件名，但不包括文件扩展呢？可以用上第二个参数。

```js
// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );
```

<br/>
<br/>

### 获取文件扩展名

简单的例子如下：

```js
var path = require('path');
var filepath = '/tmp/demo/js/test.js';

// 输出：.js
console.log( path.extname(filepath) );
```

更详细的规则是如下：（假设 `path.basename(filepath) === B` ）

- 从 `B` 的最后一个`.`开始截取，直到最后一个字符。
- 如果 `B` 中不存在`.`，或者 `B` 的第一个字符就是`.`，那么返回空字符串。

直接看[官方文档](https://nodejs.org/api/path.html#path_path_extname_path)的例子

```js
path.extname('index.html')
// returns '.html'

path.extname('index.coffee.md')
// returns '.md'

path.extname('index.')
// returns '.'

path.extname('index')
// returns ''

path.extname('.index')
// returns ''
```

<br/>
<br/>
<br/>

## 路径组合

- [path.join([...paths])](https://nodejs.org/api/path.html#path_path_join_paths)
- [path.resolve([...paths])](https://nodejs.org/api/path.html#path_path_resolve_paths)

<br/>
<br/>

### path.join([...paths])

`path.join()` 方法使用特定于平台的分隔符作为分隔符，将所有给定的路径段连接在一起，然后对结果路径进行规范化。

零长度的路径段被忽略。如果连接的路径字符串是一个零长度的字符串，则 `'.'` 将返回，表示当前工作目录。

例子如下：

```js
var path = require('path');

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'
```

path定义的伪代码如下：

```js
module.exports.join = function(){
  var paths = Array.prototye.slice.call(arguments, 0);
  return this.normalize( paths.join('/') );
};
```

<br/>
<br/>

###
























<br/>
<br/>
<br/>

## 路径解析






























<br/>
<br/>
<br/>

## path.normalize(filepath)






























<br/>
<br/>
<br/>

## 文件路径分解/组合






























<br/>
<br/>
<br/>

## 获取相对路径






























<br/>
<br/>
<br/>

## 平台相关接口/属性






























<br/>
<br/>
<br/>

## 相关链接






























<br/>
<br/>
<br/>

