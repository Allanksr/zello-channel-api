!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Player=e():(t.ZCC=t.ZCC||{},t.ZCC.Player=e())}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=39)}({38:function(t,e,n){"use strict";function i(t){this.init(t)}i.prototype.init=function(t){this.option=Object.assign({},{encoding:"16bitInt",channels:1,sampleRate:8e3,flushingTime:1e3},t),this.samples=new Float32Array,this.flush=this.flush.bind(this),this.interval=setInterval(this.flush,this.option.flushingTime),this.maxValue=this.getMaxValue(),this.typedArray=this.getTypedArray(),this.createContext()},i.prototype.webAudioTouchUnlock=function(t){return new Promise(function(e,n){if("suspended"===t.state&&"ontouchstart"in window){var i=function i(){t.resume().then(function(){document.body.removeEventListener("touchstart",i),document.body.removeEventListener("touchend",i),e(!0)},function(t){n(t)})};document.body.addEventListener("touchstart",i,!1),document.body.addEventListener("touchend",i,!1)}else e(!1)})},i.prototype.getMaxValue=function(){var t={"8bitInt":128,"16bitInt":32768,"32bitInt":2147483648,"32bitFloat":1};return t[this.option.encoding]?t[this.option.encoding]:t["16bitInt"]},i.prototype.getTypedArray=function(){var t={"8bitInt":Int8Array,"16bitInt":Int16Array,"32bitInt":Int32Array,"32bitFloat":Float32Array};return t[this.option.encoding]?t[this.option.encoding]:t["16bitInt"]},i.prototype.createContext=function(){this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.webAudioTouchUnlock(this.audioCtx).then(function(){this.gainNode=this.audioCtx.createGain(),this.gainNode.gain.value=1,this.gainNode.connect(this.audioCtx.destination),this.startTime=this.audioCtx.currentTime}.bind(this),function(t){console.error(t)})},i.prototype.isTypedArray=function(t){return t.byteLength&&t.buffer&&t.buffer.constructor==ArrayBuffer},i.prototype.feed=function(t){if(!this.muted&&this.isTypedArray(t)){t=this.getFormatedValue(t);var e=new Float32Array(this.samples.length+t.length);e.set(this.samples,0),e.set(t,this.samples.length),this.samples=e}},i.prototype.getFormatedValue=function(t){t=new this.typedArray(t.buffer);var e,n=new Float32Array(t.length);for(e=0;e<t.length;e++)n[e]=t[e]/this.maxValue;return n},i.prototype.volume=function(t){this.gainNode.gain.value=t},i.prototype.destroy=function(){this.interval&&clearInterval(this.interval),this.samples=new Float32Array,this.audioCtx.close(),this.audioCtx=null},i.prototype.flush=function(){if(this.samples.length){var t,e,n,i,o,r=this.audioCtx.createBufferSource(),s=this.samples.length/this.option.channels,a=this.audioCtx.createBuffer(this.option.channels,s,this.option.sampleRate);for(e=0;e<this.option.channels;e++)for(t=a.getChannelData(e),n=e,o=50,i=0;i<s;i++)t[i]=this.samples[n],i<50&&(t[i]=t[i]*i/50),i>=s-51&&(t[i]=t[i]*o--/50),n+=this.option.channels;this.startTime<this.audioCtx.currentTime&&(this.startTime=this.audioCtx.currentTime),r.buffer=a,r.connect(this.gainNode),r.start(this.startTime),this.startTime+=a.duration,this.samples=new Float32Array}},i.prototype.mute=function(t){this.muted=t},t.exports=i},39:function(t,e,n){"use strict";var i=n(38);t.exports=i}})});