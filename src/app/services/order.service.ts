import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer fake-jwt-token');
   
    return this.http.get('/api/orders', { headers: headers })
    .map(response => response );
  }

}
