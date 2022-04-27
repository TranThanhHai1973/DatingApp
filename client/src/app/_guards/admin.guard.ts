import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toast: ToastrService) {}
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map((user : any) => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        else{
          this.toast.error('You cannot enter this area');
          return false;
        }

      })
    )
  }
  
}
