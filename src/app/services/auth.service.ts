import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
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

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() { 

    return tokenNotExpired();
    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');

    // if(!token){
    //   return false;
    // }
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);


    // return !isExpired;
  //}
 }

 get currentUser() {
   let token = localStorage.getItem('token');
   if(!token){
     return null;
   }
   return new JwtHelper().decodeToken(token);
 }
}
