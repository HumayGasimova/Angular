"use strict";
exports.__esModule = true;
var Rx_1 = require("rxjs/Rx");
var observable = Rx_1.Observable.create(function (observer) {
    try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        // observer.complete()
        setInterval(function () {
            observer.next('I am good');
        }, 2000);
        observer.next('This will not send');
    }
    catch (err) {
        observer.error(err);
    }
});
var observer = observable.subscribe(function (x) { return console.log(x); }, function (error) { return console.log(error); }, function () { return console.log("Completed"); });
setTimeout(function () {
    observer.unsubscribe();
}, 6001);
// function addItem(val:any){
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("output").appendChild(node)
// }
