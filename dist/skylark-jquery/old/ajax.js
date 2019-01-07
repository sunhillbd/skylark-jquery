/**
 * skylark-jquery - The skylark plugin library for fully compatible API with jquery.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.6
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./core","./deferred"],function(t){var e,a,n=0,r=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,i=/^(?:text|application)\/javascript/i,s=/^(?:text|application)\/xml/i,c="application/json",u="text/html",l=/^\s*$/,p=r.createElement("a");function d(e,a,n,o){if(e.global)return function(e,a,n){var r=t.Event(a);return t(e).trigger(r,n),!r.isDefaultPrevented()}(a||r,n,o)}function f(t,e){var a=e.context;if(!1===e.beforeSend.call(a,t,e)||!1===d(e,a,"ajaxBeforeSend",[t,e]))return!1;d(e,a,"ajaxSend",[t,e])}function x(t,e,a,n){var r=a.context;a.success.call(r,t,"success",e),n&&n.resolveWith(r,[t,"success",e]),d(a,r,"ajaxSuccess",[e,a,t]),m("success",e,a)}function j(t,e,a,n,r){var o=n.context;n.error.call(o,a,e,t),r&&r.rejectWith(o,[a,e,t]),d(n,o,"ajaxError",[a,n,t||e]),m(e,a,n)}function m(e,a,n){var r=n.context;n.complete.call(r,a,e),d(n,r,"ajaxComplete",[a,n]),function(e){e.global&&!--t.active&&d(e,null,"ajaxStop")}(n)}function h(){}function v(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function y(e,a,n,r){return t.isFunction(a)&&(r=n,n=a,a=void 0),t.isFunction(n)||(r=n,n=void 0),{url:e,data:a,success:n,dataType:r}}p.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,a){if(!("type"in e))return t.ajax(e);var o,i,s=e.jsonpCallback,c=(t.isFunction(s)?s():s)||"jsonp"+ ++n,u=r.createElement("script"),l=window[c],p=function(e){t(u).triggerHandler("error",e||"abort")},d={abort:p};return a&&a.promise(d),t(u).on("load error",function(n,r){clearTimeout(i),t(u).off().remove(),"error"!=n.type&&o?x(o[0],d,e,a):j(null,r||"error",d,e,a),window[c]=l,o&&t.isFunction(l)&&l(o[0]),l=o=void 0}),!1===f(d,e)?(p("abort"),d):(window[c]=function(){o=arguments},u.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),r.head.appendChild(u),e.timeout>0&&(i=setTimeout(function(){p("timeout")},e.timeout)),d)},t.ajaxSettings={type:"GET",beforeSend:h,success:h,error:h,complete:h,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:c,xml:"application/xml, text/xml",html:u,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(n){var o,m=t.extend({},n||{}),y=t.Deferred&&t.Deferred();for(e in t.ajaxSettings)void 0===m[e]&&(m[e]=t.ajaxSettings[e]);!function(e){e.global&&0==t.active++&&d(e,null,"ajaxStart")}(m),m.crossDomain||((o=r.createElement("a")).href=m.url,o.href=o.href,m.crossDomain=p.protocol+"//"+p.host!=o.protocol+"//"+o.host),m.url||(m.url=window.location.toString()),function(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=v(e.url,e.data),e.data=void 0)}(m);var g=m.dataType,w=/\?.+=\?/.test(m.url);if(w&&(g="jsonp"),!1!==m.cache&&(n&&!0===n.cache||"script"!=g&&"jsonp"!=g)||(m.url=v(m.url,"_="+Date.now())),"jsonp"==g)return w||(m.url=v(m.url,m.jsonp?m.jsonp+"=?":!1===m.jsonp?"":"callback=?")),t.ajaxJSONP(m,y);var S,T=m.accepts[g],b={},D=function(t,e){b[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(m.url)?RegExp.$1:window.location.protocol,E=m.xhr(),F=E.setRequestHeader;if(y&&y.promise(E),m.crossDomain||D("X-Requested-With","XMLHttpRequest"),D("Accept",T||"*/*"),(T=m.mimeType||T)&&(T.indexOf(",")>-1&&(T=T.split(",",2)[0]),E.overrideMimeType&&E.overrideMimeType(T)),(m.contentType||!1!==m.contentType&&m.data&&"GET"!=m.type.toUpperCase())&&D("Content-Type",m.contentType||"application/x-www-form-urlencoded"),m.headers)for(a in m.headers)D(a,m.headers[a]);if(E.setRequestHeader=D,E.onreadystatechange=function(){if(4==E.readyState){E.onreadystatechange=h,clearTimeout(S);var e,a=!1;if(E.status>=200&&E.status<300||304==E.status||0==E.status&&"file:"==C){g=g||((n=m.mimeType||E.getResponseHeader("content-type"))&&(n=n.split(";",2)[0]),n&&(n==u?"html":n==c?"json":i.test(n)?"script":s.test(n)&&"xml")||"text"),e=E.responseText;try{"script"==g?(0,eval)(e):"xml"==g?e=E.responseXML:"json"==g&&(e=l.test(e)?null:t.parseJSON(e))}catch(t){a=t}a?j(a,"parsererror",E,m,y):x(e,E,m,y)}else j(E.statusText||null,E.status?"error":"abort",E,m,y)}var n},!1===f(E,m))return E.abort(),j(null,"abort",E,m,y),E;if(m.xhrFields)for(a in m.xhrFields)E[a]=m.xhrFields[a];var O=!("async"in m)||m.async;for(a in E.open(m.type,m.url,O,m.username,m.password),b)F.apply(E,b[a]);return m.timeout>0&&(S=setTimeout(function(){E.onreadystatechange=h,E.abort(),j(null,"timeout",E,m,y)},m.timeout)),E.send(m.data?m.data:null),E},t.get=function(){return t.ajax(y.apply(null,arguments))},t.post=function(){var e=y.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=y.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,a,n){if(!this.length)return this;var r,i=this,s=e.split(/\s/),c=y(e,a,n),u=c.success;return s.length>1&&(c.url=s[0],r=s[1]),c.success=function(e){i.html(r?t("<div>").html(e.replace(o,"")).find(r):e),u&&u.apply(i,arguments)},t.ajax(c),this};var g=encodeURIComponent;t.param=function(e,a){var n=[];return n.add=function(e,a){t.isFunction(a)&&(a=a()),null==a&&(a=""),this.push(g(e)+"="+g(a))},function e(a,n,r,o){var i,s=t.isArray(n),c=t.isPlainObject(n);t.each(n,function(n,u){i=t.type(u),o&&(n=r?o:o+"["+(c||"object"==i||"array"==i?n:"")+"]"),!o&&s?a.add(u.name,u.value):"array"==i||!r&&"object"==i?e(a,u,r,n):a.add(n,u)})}(n,e,a),n.join("&").replace(/%20/g,"+")};var w={},S=/\S+/g;function T(t){return function(e,a){"string"!=typeof e&&(a=e,e="*");var n,r=0,o=e.toLowerCase().match(S)||[];if(jQuery.isFunction(a))for(;n=o[r++];)"+"===n[0]?(n=n.slice(1)||"*",(t[n]=t[n]||[]).unshift(a)):(t[n]=t[n]||[]).push(a)}}function b(t,e){var a,n,r=jQuery.ajaxSettings.flatOptions||{};for(a in e)void 0!==e[a]&&((r[a]?t:n||(n={}))[a]=e[a]);return n&&jQuery.extend(!0,t,n),t}return t.ajaxPrefilter=T({}),t.ajaxTransport=T(w),t.ajaxSetup=function(t,e){return e?b(b(t,jQuery.ajaxSettings),e):b(jQuery.ajaxSettings,t)},t});
//# sourceMappingURL=../sourcemaps/old/ajax.js.map
