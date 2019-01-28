import { Component, AfterViewChecked } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { ThemeService } from 'shared/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routerSub: Subscription;
  routeChanged: boolean = false;

  constructor(
    public themeService: ThemeService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router) {
      auth.user$.subscribe(user => {
        if (user) {
          userService.save(user);
          const returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl) {
            localStorage.removeItem('returnUrl');
            router.navigateByUrl(returnUrl);
          }
        }
      });
  }
}
