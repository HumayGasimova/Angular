import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
import { NotFoundError } from './../common/not-found-error';
import { PostService } from './../services/post.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  posts: any;


  constructor(private service: PostService) {
  }

  ngOnInit(){
   this.service.getPosts()
    .subscribe(
     response => {
      this.posts = JSON.parse(JSON.stringify(response));
      console.log(response)
     }, 
     (error: Response) => {
      console.log(error)
      alert('an unexpected error occured.');
     });
  }

  createPost(input: HTMLInputElement){
    let post = { title: input.value};
    input.value = '';
    this.service.createPosts(post)
      .subscribe(
       response => {
        post['id'] = JSON.parse(JSON.stringify(response)).id;
        this.posts.splice(0,0,post)
        console.log(JSON.parse(JSON.stringify(response)).id)
       }, 
       (error: AppError) => {
          if(error instanceof BadInput){
            // this.form.setErrors(error.originalError);
          }
        alert('an unexpected error occured.');
        console.log(error)
       });
      // .toPromise().then(res => {
      //   console.log(res)
      // }
      // )
      // .pipe(map((res:any) => {
      //   post['id'] = res.json().id;
      //   this.posts.splice(0,0,post)
      //   console.log(res)
      // }
      
      //  ))
  }

  updatePost(post){
    this.service.updatePost(post)
      .subscribe(
        response => {
        console.log(response)
       }, 
       error => {
        alert('an unexpected error occured.');
        console.log(error)
       });
    // this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post){
    console.log(post)
    this.service.deletePost(post.id)
      .subscribe(
       response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        console.log(response)
       }, 
       (error: AppError) =>{
           if(error instanceof NotFoundError){
            alert('This post has already been deleted.');
           }else{
            alert('An unexpected error occured.');
            console.log(error)
           }
         });
  }
}
