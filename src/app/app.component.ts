import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnDestroy{
  courses: any[];
  subscription: Subscription;

  constructor( private db: AngularFireDatabase) {
    this.subscription = db.list('/courses')
    .valueChanges()
    .subscribe(courses => {
      this.courses = courses;
      console.log(courses)
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
