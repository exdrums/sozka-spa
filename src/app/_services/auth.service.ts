import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  baseUrl = 'https://localhost:5001/api/auth/';
  userToken: any;

constructor(private http: Http) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions())
    .pipe(
      map((response: Response) => {
        const user = response.json();
        // console.log('response:' + response.json());
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions());
  }

  private requestOptions() {
    const headers = new Headers({'Content-type': 'application/json'});
    return new RequestOptions({headers: headers});
  }
}
