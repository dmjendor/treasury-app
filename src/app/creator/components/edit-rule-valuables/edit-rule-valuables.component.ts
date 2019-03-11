import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DefaultValuable } from 'shared/models/defaultvaluable';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { DefaultValuablesService } from 'shared/services/default-valuables.service';

@Component({
  selector: 'edit-rule-valuables',
  templateUrl: './edit-rule-valuables.component.html',
  styleUrls: ['./edit-rule-valuables.component.css']
})
export class EditRuleValuablesComponent implements OnInit, OnDestroy {
    @Input('selectedValuable') set setSelectedValuable(value) {
      this.valuable = value;
    }
    @Input('edit') editMode: boolean;
    @Output('selectedValuableChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
    @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
    valuable: DefaultValuable;
    valuableSub: Subscription;
    valuables: DefaultValuable[];
    selected: any[];

    constructor(
      private valuableService: DefaultValuablesService,
      private confirmationDialogService: ConfirmationDialogService
      ) { }

    save() {
      if (this.valuable.hasOwnProperty('key') && this.valuable.key) {
        this.valuableService.update(this.valuable.key, this.valuable);
      } else {
        this.valuableService.create(this.valuable);
      }
      this.emitter2.emit(false);
    }

    cancel() {
      this.emitter2.emit(false);
    }

    delete() {
      const header: string = 'Please confirm..';
      const body: string = 'Are you sure you wish to delete the valuable ' + this.valuable.name + '?  This action cannot be undone.';
        this.confirmationDialogService.confirm(header, body)
        .then((confirmed) => {
          if (confirmed) {
            this.valuableService.remove(this.valuable.key);
            this.emitter2.emit(false);
          }
        })
        .catch(() => {

        });

    }

    async ngOnInit() {
      this.valuableSub = this.valuableService.getValuablesByEdition(this.valuable.edition)
      .subscribe(edt => {
        this.valuables = edt as DefaultValuable[];
      });
    }

    ngOnDestroy() {
      this.valuableSub.unsubscribe();
    }


  }
