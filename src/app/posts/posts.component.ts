import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{
  posts: any;
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.http.get(this.url)
    .subscribe((response) => {
      this.posts = response;
    })
  }

  createPost(input: HTMLInputElement){
    let post = { title: input.value};
    input.value = '';
    this.http.post(this.url, post)
      .subscribe((response)=>{
        post['id'] = response;
        this.posts.splice(0,0,post)
        console.log(response)
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
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}))
      .subscribe(response => {
        console.log(response)
      })
    // this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post){
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }
}
