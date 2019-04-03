import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare let ga: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routeSub: Subscription;
  constructor(private router: Router) {
    this.routeSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        ga('set', 'page', e.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }

  ngOnInit() {

  }

}
