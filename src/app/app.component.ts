import { NavbarComponent } from './navbar/navbar.component';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnInit{
  isChecked = true;
  courses$;
  coursePush$: AngularFireList<any[]>;
  course$;
 // author: any[];
  author$;
 subscription: Subscription;

  constructor( private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses')
                    .snapshotChanges()

    // this.course$ = db.object('/courses/1') 
    //               .valueChanges();

    // this.author$ = db.object('/authors/1') 
    // .valueChanges();
    
  }

  ngOnInit(){
    this.coursePush$ = this.db.list('/courses')
    
  }


  add(course){
    this.coursePush$.push(course.value)
    course.value='';
  }
 update(course){
   this.db.object('/courses/' + course.key)
   .set({
      title: course.payload.node_.value_ + "Updated",
      price: 150
   })
 }

 delete(course){
  this.db.object('/courses/' + course.key)
  .remove()
  .then(x=>console.log("DELETED"));
}

getContent(){
  this.db.list('/courses')
  .snapshotChanges()
  .subscribe(x => {
    console.log(x)
  })
}

onChange($event){
  console.log($event)
}
  // add(course: HTMLInputElement){
  //   this.coursePush$.push([{
  //     name: course.value,
  //     price: 150,
  //     isLive: true,
  //     section: [
  //       {title: 'Components'},
  //       {title: 'Directives'},
  //       {title: 'Template'}
  //     ]
  //   }])
  //   course.value='';
  // }


  //  this.subscription = db.list('/authors/1')
  //  .valueChanges()
  //  .subscribe(author => {
  //    this.author = author;
  //    console.log(author)
  //  })
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();

  colors = [
    {
      id: 1,
      name: 'Red'
    },
    {
      id: 2,
      name: 'Blue'
    },
    {
      id: 3,
      name: 'Green'
    },
  ]
  color=1
 
}
