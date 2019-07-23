import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private router: Router,
    private authService: AuthService) { }

    canActivate() {
      let user = this.authService.currentUser
      if(user.admin) {
        return true;
      }else{
        this.router.navigate(['/no-access']);
        return false;
      }
    }

}
