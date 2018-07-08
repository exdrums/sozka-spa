import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from '../_models/User';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/'); // , this.jwt()) ++can be used { params } ( = new HttpParams )
      // .pipe(
        // catchError(this.handleError), => ErrorInterceptor
        // map(response => <User[]>response.json()) with HttpClient makes no sense
      // );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id); // , this.jwt())
      // .pipe(
        // catchError(this.handleError) // ,
        // map(reponse => <User>response.json())
      // );
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
  // in HttpClient => auto
  // private jwt() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const headers = new Headers({'Authorization': 'Bearer ' + token});
  //     headers.append('Content-type', 'application/json');
  //     return new RequestOptions({headers: headers});
  //   }
  // }

  // removed because of global ErrorInterceptor
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
