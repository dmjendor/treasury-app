import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  user = {
    email: '',
    password: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  signInWithFacebook() {
    this.authService.login('facebook');
  }

  signInWithGoogle() {
    this.authService.login('google');
  }

  signInWithTwitter() {
    this.authService.login('twitter');
  }

  signInWithGithub() {
    this.authService.login('github');
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password);
  }
}
