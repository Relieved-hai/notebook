(window.webpackJsonp=window.webpackJsonp||[]).push([[239],{877:function(t,e,n){"use strict";n.r(e);n(216),n(217),n(104);var i=n(191),r=n.n(i),a={name:"demo1",mounted:function(){},methods:{one:function(){var t=new MutationObserver(function(t){var e=!0,n=!1,i=void 0;try{for(var a,l=t[Symbol.iterator]();!(e=(a=l.next()).done);e=!0){var o=a.value,s=!0,c=!1,d=void 0;try{for(var h,u=o.addedNodes[Symbol.iterator]();!(s=(h=u.next()).done);s=!0){var v=h.value;if(v instanceof HTMLElement){v.matches('pre[class*="language-"]')&&r.a.highlightElement(v);var f=!0,g=!1,m=void 0;try{for(var y,p=v.querySelectorAll('pre[class*="language-"]')[Symbol.iterator]();!(f=(y=p.next()).done);f=!0){var w=y.value;r.a.highlightElement(w)}}catch(t){g=!0,m=t}finally{try{f||null==p.return||p.return()}finally{if(g)throw m}}}}}catch(t){c=!0,d=t}finally{try{s||null==u.return||u.return()}finally{if(c)throw d}}}}catch(t){n=!0,i=t}finally{try{e||null==l.return||l.return()}finally{if(n)throw i}}}),e=document.getElementById("highlight-demoasdasd");t.observe(e,{childList:!0,subtree:!0})},two:function(){document.getElementById("highlight-demoasdasd").innerHTML='下面是一个代码段：\n        <pre class="language-javascript"><code> let hello = "world!"; </code></pre>\n        <div>另一个代码段：</div>\n        <div>\n          <pre class="language-css"><code>.class { margin: 5px; } </code></pre>\n        </div>\n      '}}},l=n(19),o=Object(l.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"h-b"},[this._m(0),this._v(" "),e("button",{on:{click:this.one}},[this._v("运行上面的例子")]),this._v(" "),e("button",{on:{click:this.two}},[this._v("运行下面的例子")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{attrs:{id:"highlight-demoasdasd"}},[this._v("\n    一个具有\n    "),e("code",[this._v('id="highlight-demo"')]),this._v("\n    的示例元素，运行上面那段代码来观察它。\n  ")])}],!1,null,"86064e4a",null);e.default=o.exports}}]);