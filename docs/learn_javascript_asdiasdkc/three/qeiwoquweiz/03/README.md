# Fetch：下载进度

`fetch` 方法允许去跟踪 **下载** 进度。

请注意：到目前为止，`fetch` 方法无法跟踪 **上传** 进度。对于这个目的，请使用 [XMLHttpRequest](../../qeiwoquweiz/08/README.md) ，我们在后面章节会讲到。

要跟踪下载进度，我们可以使用 `response.body` 属性。它是 `ReadableStream` —— 一个特殊的对象，它可以逐块（chunk）提供 body。在 [Streams API](https://streams.spec.whatwg.org/#rs-class) 规范中有对 `ReadableStream` 的详细描述。

与 `response.text()`，`response.json()` 和其他方法不同，`response.body` 给予了对进度读取的完全控制，我们可以随时计算下载了多少。

这是从 `response.body` 读取 response 的示例代码：

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();

// 在 body 下载时，一直为无限循环
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是块字节的 Uint8Array
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

`await reader.read()` 调用的结果是一个具有两个属性的对象：

- **`done`** —— 当读取完成时为 `true`，否则为 `false`。
- **`value`** —— 字节的类型化数组：`Uint8Array`。

<br/>

:::tip
**请注意：**

Streams API 还描述了如果使用 `for await..of` 循环异步迭代 `ReadableStream`，但是目前为止，它还未得到很好的支持（参见 [浏览器问题](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)），所以我们使用了 `while` 循环。
:::

<br/>

我们在循环中接收响应块（response chunk），直到加载完成，也就是：直到 `done` 为 `true`。

要将进度打印出来，我们只需要将每个接收到的片段 `value` 的长度（length）加到 counter 即可。

这是获取响应，并在控制台中记录进度的完整工作示例，下面有更多说明：

```js
// Step 1：启动 fetch，并获得一个 reader
let response = await fetch('https://relieved-hai.github.io/notebook/learn_javascript_asdiasdkc/three/qeiwoquweiz/03/index.json');

const reader = response.body.getReader();

// Step 2：获得总长度（length）
const contentLength = +response.headers.get('Content-Length');

// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4：将块连接到单个 Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Step 5：解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);

// 我们完成啦！
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

让我们一步步解释下这个过程：













