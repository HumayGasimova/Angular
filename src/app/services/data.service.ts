import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
        .map((response) => JSON.parse(JSON.stringify(response)))
        .catch(this.handleError);

  }

  create(resource){
      return Observable.throw(new AppError())
        return this.http.post(this.url, resource)
            .map((response) => JSON.parse(JSON.stringify(response)))
            .catch(this.handleError);
  }

  update(resource){
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true})) 
        .map((response) => JSON.parse(JSON.stringify(response)))
        .catch(this.handleError);
  }

  delete(id){
    //   return Observable.throw(new AppError());
    return this.http.delete(this.url + '/' + id)
        .map((response) => JSON.parse(JSON.stringify(response)))
        // .toPromise()
        // .retry(3)
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
