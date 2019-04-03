import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare let ga: Function;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnDestroy {
  routeSub: Subscription;

  constructor(
    private router: Router
  ) {
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
