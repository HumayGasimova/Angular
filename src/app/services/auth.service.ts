import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials)
    ).map(response => console.log(response))
  }

  logout() {}

  isLoggedIn() {
    return false;
  }
}
