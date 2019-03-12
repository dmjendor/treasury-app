import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Edition } from 'shared/models/edition';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { EditionService } from 'shared/services/edition.service';

@Component({
  selector: 'edit-rule-edition',
  templateUrl: './edit-rule-edition.component.html',
  styleUrls: ['./edit-rule-edition.component.css']
})
export class EditRuleEditionComponent {
  @Input('selectedEdition') set setSelectedEdition(value) {
    this.edition = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedEditionChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  edition: Edition;
  selected: any[];

  constructor(
    private editionService: EditionService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save() {
    if (this.edition.hasOwnProperty('key')) {
      this.editionService.update(this.edition.key, this.edition);
    } else {
      this.edition.user = sessionStorage.getItem('userId');
      this.editionService.create(this.edition);
    }
    this.emitter2.emit(false);
  }

  cancel() {
    this.emitter2.emit(false);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the edition ' + this.edition.name + '?  This action cannot be undone, and will delete all associated default treasures and valuables.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.editionService.remove(this.edition.key);
          this.emitter2.emit(false);
        }
      })
      .catch(() => {

      });

  }


}
