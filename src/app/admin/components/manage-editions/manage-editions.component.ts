import { Component, OnInit, OnDestroy } from '@angular/core';
import { Edition } from 'shared/models/edition';
import { Subscription } from 'rxjs';
import { EditionService } from 'shared/services/edition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-editions',
  templateUrl: './manage-editions.component.html',
  styleUrls: ['./manage-editions.component.css']
})
export class ManageEditionsComponent implements OnInit, OnDestroy {
  editions: Edition[];
  editionsSub: Subscription;
  selectedEdition: Edition;
  selected: any;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Active' }
  ];

  constructor(
    private editionService: EditionService,
    private router: Router
    ) {
    }

  createEdition() {
    this.router.navigate(['/admin/editions/new']);
  }

  getParentName(key: string) {
    if (this.editions && key) {
      const val = this.editions.find(vl => vl.key === key);
      return val.name;
    }
  }

  editEdition() {
    localStorage.setItem('returnUrl', '/admin/editions');
    this.router.navigate(['/admin/editions/' + this.selectedEdition.key]);
  }

  deleteEdition() {
    this.editionService.remove(this.selectedEdition.key);
  }

  onSelect({ selected }) {
    this.selectedEdition = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
    // const filteredProducts = (query) ? ;
      // this.editions.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      // this.editions;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {
    this.editionsSub = this.editionService.getAll()
    .subscribe(cls => {
      this.editions = cls as Edition[];
      this.selected = [this.editions[0]];
      this.selectedEdition = this.editions[0];
    });
  }

  ngOnDestroy() {
     this.editionsSub.unsubscribe();
  }
}


