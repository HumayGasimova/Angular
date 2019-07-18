import { Observable } from 'rxjs/Rx';
import { fromEvent } from 'rxjs';

var observable = fromEvent(document, 'mousemove')

setTimeout(() => {
    var subscription = observable.subscribe(
        (x: any) => console.log(x)
    )
},2000);