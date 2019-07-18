import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class PostService extends DataService {
  constructor(http: HttpClient) { 
    super('https://efjsonplaceholder.typicode.com/posts', http);
  }
}
