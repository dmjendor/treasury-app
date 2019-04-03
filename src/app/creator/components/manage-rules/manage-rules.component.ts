import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

declare let ga: Function;

@Component({
  selector: 'manage-rules',
  templateUrl: './manage-rules.component.html',
  styleUrls: ['./manage-rules.component.css']
})
export class ManageRulesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tabs')
  private tabs: NgbTabset;
  selectedTab: string;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
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

  ngAfterViewInit (): void {

    if (this.tabs) {
      this.selectedTab = this.route.snapshot.queryParamMap.get('tab');
        this._cdRef.detectChanges();
    }
  }

}
