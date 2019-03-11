import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { Edition } from 'shared/models/edition';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';
import { EditionService } from 'shared/services/edition.service';

@Component({
  selector: 'manage-rule-treasures',
  templateUrl: './manage-rule-treasures.component.html',
  styleUrls: ['./manage-rule-treasures.component.css']
})
export class ManageRuleTreasuresComponent implements OnInit, OnDestroy {

  userId = sessionStorage.getItem('userId');
  treasures: DefaultTreasure[];
  treasureSub: Subscription;
  selectedTreasure: DefaultTreasure;

  editions: Edition[];
  editionSub: Subscription;
  selectedEdition: string = '-1';
  selected: any[];
  viewForm: boolean = false;

  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Parent' },
    { name: 'Value' },
    { name: 'Active' }
  ];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private treasureService: DefaultTreasureService,
    private editionService: EditionService
    ) {
    }

  createTreasure() {
    this.selectedTreasure = new DefaultTreasure();
    this.selectedTreasure.edition = this.selectedEdition;
    this.viewForm = true;
  }

  editTreasure() {
    this.viewForm = true;
  }

  deleteTreasure() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete ' + this.selectedTreasure.name + '?  This action cannot be undone.';
    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.treasureService.remove(this.selectedTreasure.key);
      }
    })
    .catch(() => {
    });
  }

  getParentName(key: string) {
    if (this.treasures && key) {
      const val = this.treasures.find(vl => vl.key === key);
      return val.name;
    }
  }

  onSelect({ selected }) {
    this.selectedTreasure = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.treasures.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.treasures;
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
    if (this.treasureSub) {
      this.treasureSub.unsubscribe();
    }
    this.treasureSub = this.treasureService.getTreasuresByEdition(this.selectedEdition)
    .subscribe(edt => {
      this.treasures = edt as DefaultTreasure[];
      this.selected = [this.treasures[0]];
      this.selectedTreasure = this.treasures[0];
    });

  }

  ngOnDestroy() {
    if (this.treasureSub) {
      this.treasureSub.unsubscribe();
    }
    this.editionSub.unsubscribe();
  }
}

