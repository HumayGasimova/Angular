import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent {
  courses$;
  course$;
 // author: any[];
  author$;
 // subscription: Subscription;

  constructor( private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses')
                    .valueChanges()

    this.course$ = db.object('/courses/1') 
                  .valueChanges();

    this.author$ = db.object('/authors/1') 
    .valueChanges();
    // this.subscription = db.list('/authors/1')
    // .valueChanges()
    // .subscribe(author => {
    //   this.author = author;
    //   console.log(author)
    // })
 //
//  this.subscription = db.list('/authors/1')
//  .valueChanges()
//  .subscribe(author => {
//    this.author = author;
//    console.log(author)
//  })
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  }
}
