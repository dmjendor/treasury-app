import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';
import { Theme } from 'shared/models/theme';
import { ThemeService } from 'shared/services/theme.service';

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

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

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
  }

  saveUser() {
    this.userService.saveChanges(this.appUser, this.userId);
  }

  themePreview() {
    this.themeService.setCurrentTheme(this.appUser.theme);
  }


}
