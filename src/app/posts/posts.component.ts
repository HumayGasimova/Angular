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
    .subscribe((response) => {
      this.posts = response;
    })
  }

  createPost(input: HTMLInputElement){
    let post = { title: input.value};
    input.value = '';
   this.service.createPosts(post)
      .subscribe((response)=>{
        post['id'] = JSON.parse(JSON.stringify(response)).id;
        this.posts.splice(0,0,post)
        console.log(JSON.parse(JSON.stringify(response)).id)
      })
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
      .subscribe(response => {
        console.log(response)
      })
    // this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post){
    this.service.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }
}
