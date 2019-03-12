import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DefaultValuable } from 'shared/models/defaultvaluable';
import { Edition } from 'shared/models/edition';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultValuablesService } from 'shared/services/default-valuables.service';
import { EditionService } from 'shared/services/edition.service';

@Component({
  selector: 'manage-rule-valuables',
  templateUrl: './manage-rule-valuables.component.html',
  styleUrls: ['./manage-rule-valuables.component.css']
})
export class ManageRuleValuablesComponent implements OnInit, OnDestroy {

  userId = sessionStorage.getItem('userId');
  valuables: DefaultValuable[];
  valuableSub: Subscription;
  selectedValuable: DefaultValuable;

  editions: Edition[];
  editionSub: Subscription;
  selectedEdition: string = '-1';
  selected: any[];
  viewForm: boolean = false;

  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Parent' },
    { name: 'LowValue' },
    { name: 'HighValue' },
    { name: 'Active' }
  ];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private valuableService: DefaultValuablesService,
    private editionService: EditionService,
    private router: Router
    ) {
    }

  createValuable() {
    this.selectedValuable = new DefaultValuable();
    this.selectedValuable.edition = this.selectedEdition;
    this.viewForm = true;
  }

  editValuable() {
    this.viewForm = true;
  }

  deleteValuable() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete ' + this.selectedValuable.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.valuableService.remove(this.selectedValuable.key);
      }
    })
    .catch(() => {
    });
  }

  getParentName(key: string) {
    if (this.valuables && key) {
      const val = this.valuables.find(vl => vl.key === key);
      return val.name;
    }
  }

  onSelect({ selected }) {
    this.selectedValuable = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.valuables.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.valuables;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {

    this.editionSub = this.editionService.getEditionsByUser(this.userId)
    .subscribe(edt => {
      this.editions = edt as Edition[];
    });
  }

  selectEdition() {
    if (this.valuableSub) {
      this.valuableSub.unsubscribe();
    }
    this.valuableSub = this.valuableService.getValuablesByEdition(this.selectedEdition)
    .subscribe(edt => {
      this.valuables = edt as DefaultValuable[];
      this.selected = [this.valuables[0]];
      this.selectedValuable = this.valuables[0];
    });

  }

  ngOnDestroy() {
    if (this.valuableSub) {
      this.valuableSub.unsubscribe();
    }
    this.editionSub.unsubscribe();
  }
}
