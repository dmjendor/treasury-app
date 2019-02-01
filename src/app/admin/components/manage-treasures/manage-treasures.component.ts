import { Component, OnInit, OnDestroy } from '@angular/core';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Subscription } from 'rxjs';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-treasures',
  templateUrl: './manage-treasures.component.html',
  styleUrls: ['./manage-treasures.component.css']
})
export class ManageTreasuresComponent implements OnInit, OnDestroy {
  treasures: DefaultTreasure[];
  treasuresSub: Subscription;
  selectedTreasure: DefaultTreasure;
  selected: any;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'lowvalue'},
    { name: 'highvalue'},
    { name: 'parent' },
    { name: 'Active' }
  ];

  constructor(
    private treasureService: DefaultTreasureService,
    private router: Router
    ) {
    }

  createTreasure() {
    this.router.navigate(['/admin/treasures/new']);
  }

  getParentName(key: string) {
    if (this.treasures && key) {
      const val = this.treasures.find(vl => vl.key === key);
      return val.name;
    }
  }

  editTreasure() {
    localStorage.setItem('returnUrl', '/admin/treasures');
    this.router.navigate(['/admin/treasures/' + this.selectedTreasure.key]);
  }

  deleteTreasure() {
    this.treasureService.remove(this.selectedTreasure.key);
  }

  onSelect({ selected }) {
    this.selectedTreasure = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
    // const filteredProducts = (query) ? ;
      // this.treasures.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      // this.treasures;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {
    this.treasuresSub = this.treasureService.getAll()
    .subscribe(cls => {
      this.treasures = cls as DefaultTreasure[];
      this.selected = [this.treasures[0]];
      this.selectedTreasure = this.treasures[0];
    });
  }

  ngOnDestroy() {
     this.treasuresSub.unsubscribe();
  }
}

