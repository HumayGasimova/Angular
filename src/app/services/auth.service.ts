import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials) { 
    return this.http.post('/api/authenticate', 
       JSON.stringify(credentials))
       .map(response => {
         let result = JSON.parse(JSON.stringify(response));
         if (result && result.token){
           localStorage.setItem('token', result.token);
           return true;
         }else{
           return false;
         }
       })
   }

  logout() {}

  isLoggedIn() {
    return false;
  }
}
