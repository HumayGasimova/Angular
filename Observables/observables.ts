import { Observable } from 'rxjs/Rx';

var observable = Observable.create((observer: any) => {
    try{
        observer.next('Hey guys!')
        observer.next('How are you?')
        // observer.complete()
        setInterval(() => {
            observer.next('I am good')
        }, 2000)
        observer.next('This will not send')
    }catch(err){
        observer.error(err)
    }
})

var observer = observable.subscribe(
    (x: any) => console.log(x),
    (error: any) => console.log(error),
    () => console.log("Completed")
)

setTimeout(() => {
    observer.unsubscribe();
}, 6001)

// function addItem(val:any){
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("output").appendChild(node)
// }

// tsc observables.ts
// node observables.js