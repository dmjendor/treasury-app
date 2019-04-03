import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Theme } from 'shared/models/theme';
import { AuthService } from 'shared/services/auth.service';
import { ThemeService } from 'shared/services/theme.service';
import { UserService } from 'shared/services/user.service';

declare let ga: Function;

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  userSubscription: Subscription;
  userId: string;
  themeSub: Subscription;
  themeList: Theme[];
  routeSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        ga('set', 'page', e.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.themeSub = this.themeService.getAll()
      .subscribe(theme => {
        this.themeList = theme as Theme[];
        this.themeService.setCurrentTheme(this.appUser.theme);
      });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.themeSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  saveUser() {
    this.userService.saveChanges(this.appUser, this.userId);
  }

  themePreview() {
    this.themeService.setCurrentTheme(this.appUser.theme);
  }


}
