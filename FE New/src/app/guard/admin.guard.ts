import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    // Redirect to a not authorized page or login
    this.router.navigate(['/not-authorized']);
    return false;
  }
}