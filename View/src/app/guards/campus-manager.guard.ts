import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CampusManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.hasRole('Campus Manager')) {
      return true;
    } else if( this.authService.hasRole('Admin')){
      return true;
    }else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
