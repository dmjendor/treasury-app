import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Edition } from 'shared/models/edition';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { EditionService } from 'shared/services/edition.service';

@Component({
  selector: 'manage-rule-editions',
  templateUrl: './manage-rule-editions.component.html',
  styleUrls: ['./manage-rule-editions.component.css']
})
export class ManageRuleEditionsComponent implements OnInit, OnDestroy {

  userId = sessionStorage.getItem('userId');
  editions: Edition[];
  editionSub: Subscription;
  viewForm: boolean = false;
  editMode: boolean = false;

  selected: any[];
  selectedEdition: Edition;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Active' }
  ];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private editionService: EditionService,
    private router: Router
    ) {
    }

  createEdition() {
    this.selectedEdition = new Edition();
    this.viewForm = true;
  }

  editEdition() {
    this.viewForm = true;
  }

  deleteEdition() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the edition ' + this.selectedEdition.name + '?  This action cannot be undone, and will delete all associated default treasures and valuables.';    this.confirmationDialogService.confirm(header, body)
    .then((confirmed) => {
      if (confirmed) {
        this.editionService.remove(this.selectedEdition.key);
      }
    })
    .catch(() => {
    });
  }

  onSelect({ selected }) {
    this.selectedEdition = this.selected[0];
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.editions.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.editions;
    // this.initializeTable(filteredProducts);

  }

  async ngOnInit() {

    this.editionSub = this.editionService.getEditionsByUser(this.userId)
    .subscribe(edt => {
      this.editions = edt as Edition[];
      this.selected = [this.editions[0]];
      this.selectedEdition = this.editions[0];
    });
  }

  ngOnDestroy() {
    this.editionSub.unsubscribe();
  }
}
