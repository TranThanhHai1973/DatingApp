import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
   baseUrl = environment.apiUrl;
   private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();
   
  constructor(private http: HttpClient, private presence: PresenceService) { }
  
  login(model: any) {
    //-------------- here ⇊⇊ ------
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user : User) => {
        if (user) {
          //localStorage.setItem('user', JSON.stringify(user));
         this.setCurrentUser(user);
         this.presence.createHubConnection(user);
        }
      })
    )
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register' , model).pipe(
      map((user: User) => {
        if(user) {
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);

        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodeToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
   
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
    this.presence.stopHubConnection();
  }

  getDecodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
