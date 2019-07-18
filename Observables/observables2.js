"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var observable = rxjs_1.fromEvent(document, 'mousemove');
setTimeout(function () {
    var subscription = observable.subscribe(function (x) { return console.log(x); });
}, 2000);
