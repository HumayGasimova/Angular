import { Component} from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',

})
export class ContactFormComponent{

  constructor() { }

 log(x){console.log(x)}

 submit(x){
  console.log(x);
}
}
