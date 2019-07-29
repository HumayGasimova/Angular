import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnInit{
  courses$;
  coursePush$: AngularFireList<any[]>;
  course$;
 // author: any[];
  author$;
 // subscription: Subscription;

  constructor( private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses')
                    .valueChanges()

    // this.course$ = db.object('/courses/1') 
    //               .valueChanges();

    // this.author$ = db.object('/authors/1') 
    // .valueChanges();
    
  }

  ngOnInit(){
    this.coursePush$ = this.db.list('/courses')
  }

  add(course){
    this.coursePush$.push([{
      name: course.value,
      id: 8
    }])
    course.value='';
  }


  //  this.subscription = db.list('/authors/1')
  //  .valueChanges()
  //  .subscribe(author => {
  //    this.author = author;
  //    console.log(author)
  //  })
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
 
}
