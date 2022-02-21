import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';
import { AuthguardServiceService } from './authguard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatonGuard implements CanActivate {
  constructor(private service: AuthguardServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.service.gettoken()) {
      return true;
    } else {
      this.router.navigate([""]);
      return false
    }
  }
}