import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
   posts: any;
  constructor(http: HttpClient) {
    http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((response) => {
        this.posts = response;
      })
  }


}
