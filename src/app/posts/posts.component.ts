import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: any;
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  http.get(this.url)
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
}
