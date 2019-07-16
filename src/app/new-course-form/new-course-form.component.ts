import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { fbind } from 'q';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.scss']
})
export class NewCourseFormComponent{
  form
  // form = new FormGroup({
  //   name: new FormControl('',Validators.required),
  //   contact: new FormGroup({
  //     email: new FormControl(),
  //     phone: new FormControl()
  //   }),
  //   topics: new FormArray([])
  // });

  constructor(fb: FormBuilder){
    this.form = fb.group({
      name: ['',Validators.required],
      contact: fb.group({
        email: [],
        phone: []
      }),
      topics: fb.array ([])
    })
  }

  addTopic(topic: HTMLInputElement){
    (this.form.get('topics') as FormArray).push(new FormControl(topic.value));
    topic.value = '';
  }

  removeTopic(topic: FormControl){
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  get topics(){
    return this.form.get('topics') as FormArray
  }
 
}
