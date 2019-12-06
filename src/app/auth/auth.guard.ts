import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // Check if the route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser['role']) === -1) {
        // Role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // Authorised so return true
      return true;
    }


    // Not logged in so return to login page with the return URL
    this.authService.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}