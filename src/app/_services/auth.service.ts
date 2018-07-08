import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_models/authUser';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  // default NavBar photo as BS
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // observable object for BS photo, to subscribe from all components
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient, private jwtHelperSerice: JwtHelperService) { }

  changeMemberPhoto(photoUrl) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'login', model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
    .pipe(
      // catchError(this.handleError),
      map(user => {
        // console.log('response:' + response.json());
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelperSerice.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
    // .pipe(catchError(this.handleError));
  }

  loggedIn() {
    const token = this.jwtHelperSerice.tokenGetter();
    if (!token) {
      return false;
    }
    return !this.jwtHelperSerice.isTokenExpired(token);
  }

  // removed because of update to HttpClient
  // private requestOptions() {
  //   const headers = new Headers({'Content-type': 'application/json'});
  //   return new RequestOptions({headers: headers});
  // }

  // private handleError(error: any) {
  //   const applicationError = error.headers.get('Application-Error');
  //   if (applicationError) {
  //     return Observable.throw(applicationError);
  //   }
  //   const serverError = error.json();
  //   let modelStateErrors = '';
  //   if (serverError) {
  //     for (const key in serverError) {
  //       if (serverError[key]) {
  //         modelStateErrors += serverError[key] + '\n';
  //       }
  //     }
  //   }
  //   return throwError(modelStateErrors || 'Server error');
  // }


}
