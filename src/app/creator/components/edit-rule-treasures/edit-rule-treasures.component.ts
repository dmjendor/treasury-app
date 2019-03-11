import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultTreasure } from 'shared/models/defaulttreasure';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultTreasureService } from 'shared/services/default-treasure.service';

@Component({
  selector: 'edit-rule-treasures',
  templateUrl: './edit-rule-treasures.component.html',
  styleUrls: ['./edit-rule-treasures.component.css']
})
export class EditRuleTreasuresComponent implements OnInit {
  @Input('selectedTreasure') set setSelectedTreasure(value) {
    this.treasure = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedTreasureChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  treasure: DefaultTreasure;
  treasureSub: Subscription;
  treasures: DefaultTreasure[];
  selected: any[];

  constructor(
    private treasureService: DefaultTreasureService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save() {
    if (this.treasure.hasOwnProperty('key') && this.treasure.key) {
      this.treasureService.update(this.treasure.key, this.treasure);
    } else {
      this.treasureService.create(this.treasure);
    }
    this.emitter2.emit(false);
  }

  cancel() {
    this.emitter2.emit(false);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the treasure ' + this.treasure.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.treasureService.remove(this.treasure.key);
          this.emitter2.emit(false);
        }
      })
      .catch(() => {

      });

  }

  async ngOnInit() {
    this.treasureSub = this.treasureService.getTreasuresByEdition(this.treasure.edition)
    .subscribe(edt => {
      this.treasures = edt as DefaultTreasure[];
    });
  }

  ngOnDestroy() {
    this.treasureSub.unsubscribe();
  }


}
