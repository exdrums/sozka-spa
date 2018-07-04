import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sozka app';

  constructor(private authService: AuthService, private jwtHelperService: JwtHelperService) {}

  ngOnInit() {
    // this loads decodedToken in service to show user-name in nav-component
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
  }
}
