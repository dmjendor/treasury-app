import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit, AfterViewInit  {
  @ViewChild('tabs')
  private tabs: NgbTabset;
  selectedTab: string;

  constructor(
    private route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef
  ) {
   }

  ngOnInit() {
  }

  ngAfterViewInit (): void {

    if (this.tabs) {
      this.selectedTab = this.route.snapshot.queryParamMap.get('tab');
        this._cdRef.detectChanges();
    }
}

}
