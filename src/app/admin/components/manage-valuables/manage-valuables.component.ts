import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DefaultValuablesService } from 'admin/services/default-valuables.service';
import { DefaultValuable } from 'shared/models/defaultvaluable';

@Component({
  selector: 'app-manage-valuables',
  templateUrl: './manage-valuables.component.html',
  styleUrls: ['./manage-valuables.component.css']
})
export class ManageValuablesComponent implements OnInit, OnDestroy {
  valuables: DefaultValuable[];
  valuablesSub: Subscription;
  selectedValuable: DefaultValuable;
  selected: any;
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'lowvalue', name: 'Low Value' },
    { prop: 'highvalue', name: 'High Value' },
    { name: 'Active' }
  ];

  constructor(
    private valuableService: DefaultValuablesService,
    private router: Router
    ) {
    }

  createValuable() {
    this.router.navigate(['/admin/valuables/new']);
  }

  editValuable() {
    localStorage.setItem('returnUrl', '/admin/valuables');
    // this.router.navigate(['/admin/valuables/' + this.selectedValuable.key]);
  }

  deleteValuable() {
    // this.valuableService.remove(this.selectedValuable.key);
  }

  onSelect({ selected }) {
    // this.selectedValuable = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
    // const filteredProducts = (query) ? ;
      // this.valuables.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      // this.valuables;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {
    this.valuablesSub = this.valuableService.getAll()
    .subscribe(cls => {
      this.valuables = cls as DefaultValuable[];
      this.selected = [this.valuables[0]];
      this.selectedValuable = this.valuables[0];
    });
  }

  ngOnDestroy() {
    // this.valuableSub.unsubscribe();
  }
}

