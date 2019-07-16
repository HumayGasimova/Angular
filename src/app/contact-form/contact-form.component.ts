import { Component} from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',

})
export class ContactFormComponent{

  constructor() { }

  contactMethods = [
    {id: 1, name: "Email"},
    {id: 2, name: "Phone"}
  ]

 log(x){console.log(x)}

 submit(x){
  console.log(x);
}
}
