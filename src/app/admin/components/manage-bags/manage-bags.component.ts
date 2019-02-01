import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bag } from 'shared/models/bag';
import { Subscription } from 'rxjs';
import { BagService } from 'shared/services/bag.service';
import { Router } from '@angular/router';
import { DefaultBag } from 'shared/models/defaultbag';
import { DefaultBagService } from 'shared/services/default-bag.service';

@Component({
  selector: 'manage-bags',
  templateUrl: './manage-bags.component.html',
  styleUrls: ['./manage-bags.component.css']
})

export class ManageBagsComponent implements OnInit, OnDestroy {
  bags: DefaultBag[];
  bagSub: Subscription;
  selected: any[];
  selectedBag: DefaultBag;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Active' }
  ];

  constructor(
    private bagService: DefaultBagService,
    private router: Router
    ) {
    }

  createBag() {
    this.router.navigate(['/admin/bags/new']);
  }

  editBag() {
    localStorage.setItem('returnUrl', '/admin?tab=bags');
    this.router.navigate(['/admin/bags/' + this.selectedBag.key]);
  }

  deleteBag() {
    this.bagService.remove(this.selectedBag.key);
  }

  onSelect({ selected }) {
    this.selectedBag = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.bags.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.bags;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {
    this.bagSub = this.bagService.getAll()
    .subscribe(cls => {
      this.bags = cls as DefaultBag[];
      this.selected = [this.bags[0]];
      this.selectedBag = this.bags[0];
    });
  }

  ngOnDestroy() {
    this.bagSub.unsubscribe();
  }
}

