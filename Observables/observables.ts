import { Observable } from 'rxjs/Rx';

var observable = Observable.create((observer: any) => {
    try{
        observer.next('Hey guys!')
        observer.next('How are you?')
        setInterval(() => {
            observer.next('I am good')
        }, 1000)
        // observer.complete()
        // observer.next('This will not send')
    }catch(err){
        observer.error(err)
    }
}).share();

var observer = observable.subscribe(
    (x: any) => console.log(x),
    (error: any) => console.log(error),
    () => console.log("Completed")
)
// var observer2 = observable.subscribe(
//     (x: any) => console.log(x)
// )

setTimeout(() => {
   var observer2 = observable.subscribe(
       (x: any) => console.log('Subscribe 2: ' + x)
   );
}, 1000)

// function addItem(val:any){
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("output").appendChild(node)
// }

// tsc observables.ts
// node observables.js