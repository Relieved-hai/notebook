(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{213:function(t,n,e){var a=e(68);a(a.P,"Function",{bind:e(214)})},214:function(t,n,e){"use strict";var a=e(110),i=e(20),r=e(215),c=[].slice,o={};t.exports=Function.bind||function(t){var n=a(this),e=c.call(arguments,1),u=function(){var a=e.concat(c.call(arguments));return this instanceof u?function(t,n,e){if(!(n in o)){for(var a=[],i=0;i<n;i++)a[i]="a["+i+"]";o[n]=Function("F,a","return new F("+a.join(",")+")")}return o[n](t,e)}(n,a.length,a):r(n,a,t)};return i(n.prototype)&&(u.prototype=n.prototype),u}},215:function(t,n){t.exports=function(t,n,e){var a=void 0===e;switch(n.length){case 0:return a?t():t.call(e);case 1:return a?t(n[0]):t.call(e,n[0]);case 2:return a?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return a?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return a?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},321:function(t,n,e){},837:function(t,n,e){t.exports=e(838)},838:function(t,n,e){e(839);var a=e(16).Object;t.exports=function(t,n,e){return a.defineProperty(t,n,e)}},839:function(t,n,e){var a=e(40);a(a.S+a.F*!e(6),"Object",{defineProperty:e(13).f})},840:function(t,n,e){"use strict";var a=e(321);e.n(a).a},870:function(t,n,e){"use strict";e.r(n);e(213);var a=e(837),i=e.n(a);function r(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),i()(t,a.key,a)}}var c={name:"demo",mounted:function(){this.$nextTick(function(){new(function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this._elem=n,n.onclick=this.onClick.bind(this)}var n,e,a;return n=t,(e=[{key:"save",value:function(){alert("saving")}},{key:"load",value:function(){alert("loading")}},{key:"search",value:function(){alert("searching")}},{key:"onClick",value:function(t){var n=t.target.dataset.action;n&&this[n]()}}])&&r(n.prototype,e),a&&r(n,a),t}())(menu)})}},o=(e(840),e(19)),u=Object(o.a)(c,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"h-b"},[n("div",{attrs:{id:"menu"}},[n("button",{attrs:{"data-action":"save"}},[this._v("Save")]),this._v(" "),n("button",{attrs:{"data-action":"load"}},[this._v("Load")]),this._v(" "),n("button",{attrs:{"data-action":"search"}},[this._v("Search")])])])}],!1,null,"2bc7f361",null);n.default=u.exports}}]);