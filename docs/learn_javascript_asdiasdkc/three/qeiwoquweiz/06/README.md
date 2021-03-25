# Fetch API

到目前为止，我们已经对 `fetch` 相当了解了。

现在让我们来看看 `fetch` 的剩余 API，来了解它的全部本领吧。

<br/>

:::tip
**请注意：**

请注意：这些选项 (option) 大多都很少使用。即使跳过本章，你也可以很好地使用 `fetch`。

但是，知道 `fetch` 可以做什么还是很好的，所以如果需要，你可以来看看这些细节内容。
:::

<br/>

这是所有可能的 `fetch` 选项及其默认值（注释中标注了可选值）的完整列表：

```js
let promise = fetch(url, {
  method: "GET", // POST，PUT，DELETE，等。
  headers: {
    // 内容类型 header 值通常是自动设置的
    // 取决于 request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string，FormData，Blob，BufferSource，或 URLSearchParams
  referrer: "about:client", // 或 "" 以不发送 Referer header，
  // 或者是当前源的 url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer，origin，same-origin...
  mode: "cors", // same-origin，no-cors
  credentials: "same-origin", // omit，include
  cache: "default", // no-store，reload，no-cache，force-cache，或 only-if-cached
  redirect: "follow", // manual，error
  integrity: "", // 一个 hash，像 "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController 来中止请求
  window: window // null
});
```

一个令人印象深刻的列表，对吧?

我们已经在 [Fetch](../../qeiwoquweiz/01/README.md) 一章中详细介绍了 `method`，`headers` 和 `body`。

在 [Fetch：中止（Abort）](../../qeiwoquweiz/04/README.md) 一章中介绍了 `signal` 选项。

现在让我们学习其余的本领。

<br/>
<br/>
<br/>

## referrer，referrerPolicy

这些选项决定了 `fetch` 如何设置 HTTP 的 `Referer` header。

通常来说，这个 header 是被自动设置的，并包含了发出请求的页面的 url。在大多数情况下，它一点也不重要，但有时出于安全考虑，删除或缩短它是有意义的。

<br/>

**`referer` 选项允许设置在当前域的任何 `Referer`，或者移除它。**

<br/>

要不发送 referer，可以将 `referer` 设置为空字符串：

```js {2}
fetch('/page', {
  referrer: "" // 没有 Referer header
});
```

设置在当前域内的另一个 url：

```js {4}
fetch('/page', {
  // 假设我们在 https://relieved-hai.github.io
  // 我们可以设置任何 Referer header，但必须是在当前域内的
  referrer: "https://relieved-hai.github.io/notebook"
});
```

<br/>

**`referrerPolicy` 选项为 `Referer` 设置一般的规则。**

请求分为 3 种类型：

- 同源请求。
- 跨源请求。
- 从 HTTPS 到 HTTP 的请求 (从安全协议到不安全协议)。

与 `referrer` 选项允许设置确切的 `Referer` 值不同，`referrerPolicy` 告诉浏览器针对各个请求类型的一般的规则。

可能的值在 [Referrer Policy 规范](https://w3c.github.io/webappsec-referrer-policy/) 中有详细描述：

- **`"no-referrer-when-downgrade"`** —— 默认值：除非我们从 HTTPS 发送请求到 HTTP（到安全性较低的协议），否则始终会发送完整的 `Referer`。
- **`"no-referrer"`** —— 从不发送 `Referer`。
- **`"origin"`** —— 只发送在 `Referer` 中的域，而不是完整的页面 URL，例如，只发送 `http://site.com` 而不是 `http://site.com/path`。
- **`"origin-when-cross-origin"`** —— 发送完整的 `Referer` 到相同的源，但对于跨源请求，只发送域部分（同上）。
- **`"same-origin"`** —— 发送完整的 `Referer` 到相同的源，但对于跨源请求，不发送 `Referer`。
- **`"strict-origin"`** —— 仅发送源值，不发送 HTTPS → HTTP 请求的引荐来源。
- **`"strict-origin-when-cross-origin"`** —— 对于同源情况下则发送完整的 `Referer`，对于跨源情况下，则只发送域，如果是 HTTPS → HTTP 请求，则什么都不发送。
- **`"unsafe-url"`** —— 在 `Referer` 中始终发送完整的 url，即使是 HTTPS → HTTP 请求。

这是一个包含所有组合的表格：

| **值** | **同源** | **跨源** | **HTTPS→HTTP** |
| - | - | - | - |
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade" 或 ""（默认）` | 完整的 url | 完整的 url | - |
| `"origin"` | 仅域 | 仅域 | 仅域 |
| `"origin-when-cross-origin"` | 完整的 url | 仅域 | 仅域 |
| `"same-origin"` | 完整的 url | - | - |
| `"strict-origin"` | 仅域 | 仅域 | - |
| `"strict-origin-when-cross-origin"` | 完整的 url | 仅域 | - |
| `"unsafe-url"` | 完整的 url | 完整的 url | 完整的 url |

<br/>

假如我们有一个带有 URL 结构的管理区域（admin zone），它不应该被从网站外看到。

如果我们发送了一个 `fetch`，则默认情况下，它总是发送带有页面完整 url 的 `Referer` header（我们从 HTTPS 向 HTTP 发送请求的情况除外，这种情况下没有 `Referer`）。

例如 `Referer: https://relieved-hai.github.io/admin/secret/paths`。

如果我们想让其他网站只知道域的部分，而不是 URL 路径，我们可以这样设置选项：

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://relieved-hai.github.io
});
```

我们可以将其置于所有 `fetch` 调用中，也可以将其集成到我们项目的执行所有请求并在内部使用 `fetch` 的 JavaScript 库中。

与默认行为相比，它的唯一区别在于，对于跨源请求，`fetch` 只发送 URL 域的部分（例如 `https://relieved-hai.github.io`，没有路径）。对于同源请求，我们仍然可以获得完整的 `Referer`（可能对于调试目的是有用的）。

<br/>

:::tip
**Referrer policy 不仅适用于 `fetch`**

在 [规范](https://w3c.github.io/webappsec-referrer-policy/) 中描述的 referrer policy，不仅适用于 `fetch`，它还具有全局性。

特别是，可以使用 `Referrer-Policy` HTTP header，或者为每个链接设置 `<a rel="noreferrer">`，来为整个页面设置默认策略（policy）。
:::

<br/>
<br/>
<br/>

## mode
































<br/>
<br/>
<br/>

## credentials
































<br/>
<br/>
<br/>

## cache
































<br/>
<br/>
<br/>

## redirect
































<br/>
<br/>
<br/>

## integrity
































<br/>
<br/>
<br/>

## keepalive
































<br/>
<br/>
<br/>

