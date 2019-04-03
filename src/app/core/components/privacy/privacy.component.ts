import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare let ga: Function;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnDestroy {
  routeSub: Subscription;

  constructor(private router: Router) {
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        ga('set', 'page', e.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
