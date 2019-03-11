import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'manage-rules',
  templateUrl: './manage-rules.component.html',
  styleUrls: ['./manage-rules.component.css']
})
export class ManageRulesComponent implements AfterViewInit {
  @ViewChild('tabs')
  private tabs: NgbTabset;
  selectedTab: string;

  constructor(
    private route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    ) {
    }

  ngAfterViewInit (): void {

    if (this.tabs) {
      this.selectedTab = this.route.snapshot.queryParamMap.get('tab');
        this._cdRef.detectChanges();
    }
  }

}
