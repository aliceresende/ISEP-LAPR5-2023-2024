import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

// FleetManagerGuard
canActivate(): boolean {
  if (this.authService.hasRole('Admin')) {
    return true;   
  } else {
    this.router.navigate(['/']); // Redirect to login if not a Fleet Manager
    return false;
  }
}

}