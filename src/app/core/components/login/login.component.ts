import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { GoogleAnalyticsService } from 'shared/services/google-analytics-service';

declare let ga: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy  {
  user = {
    email: '',
    password: ''
  };
  routeSub: Subscription;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private authService: AuthService,
    private router: Router
    ) {
      this.routeSub = this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          ga('set', 'page', e.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }

  signInWithFacebook() {
    this.authService.login('facebook');
    this.googleAnalyticsService.eventEmitter('loginPage', 'login', 'facebook', 1);
  }

  signInWithGoogle() {
    this.googleAnalyticsService.eventEmitter('loginPage', 'login', 'google', 1);
    this.authService.login('google');
  }

  signInWithTwitter() {
    this.authService.login('twitter');
    this.googleAnalyticsService.eventEmitter('loginPage', 'login', 'twitter', 1);
  }

  signInWithGithub() {
    this.googleAnalyticsService.eventEmitter('loginPage', 'login', 'github', 1);
    this.authService.login('github');
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
