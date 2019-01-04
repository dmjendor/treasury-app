import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  saveUser(user: AppUser) {
    console.log(user);
    this.userService.saveChanges(user, this.userId);
  }

}
