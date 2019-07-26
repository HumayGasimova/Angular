import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent {
  courses: any[];

  constructor( private db: AngularFireDatabase) {
    db.list('courses')
    .valueChanges()
    .subscribe(courses => {
      this.courses = courses;
      console.log(courses)
    })
  }
}
