import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signIn(credentials){
    this.authService.login(credentials)
      .subscribe(result => {console.log(result)
        // if(result){
        //   this.router.navigate(['/']);
        // }else{
        //   this.invalidLogin = true;
        // }
      });
  }

}
