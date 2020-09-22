import { Injectable, TestabilityRegistry } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private auth: AuthService,
              private router: Router ) {
              }

  canActivate(): boolean  {
   if ( this.auth.estaAutenticado() === true) {
     return true;
   } else {
    console.log('guard de nuevo');
    this.router.navigateByUrl('/login');
  }
    // return this.auth.estaAutenticado();
   /*
   if ( this.auth.estaAutenticado() ) {
     return true;
   } else {
     console.log('guard de nuevo');
     this.router.navigateByUrl('/login');
   }*/
  }
}

