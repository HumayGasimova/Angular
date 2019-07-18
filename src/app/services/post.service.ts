import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://efjsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url)
    .catch(this.handleError);

  }

  createPosts(post){
    return this.http.post(this.url, post)
    .catch(this.handleError);
  }

  updatePost(post){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true})) 
    .catch(this.handleError);
  }

  deletePost(id){
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError);
  }
  private handleError(error: Response){
    if(error.status === 400)
      return Observable.throw(new BadInput(JSON.parse(JSON.stringify(error))))
      
    if(error.status === 404)
      return Observable.throwError(new NotFoundError());
      
      return Observable.throwError(new AppError(error));
  }
}
