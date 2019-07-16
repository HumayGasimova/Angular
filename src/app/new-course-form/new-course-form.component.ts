import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.scss']
})
export class NewCourseFormComponent{

  form = new FormGroup({
    topics: new FormArray([])
  });

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
