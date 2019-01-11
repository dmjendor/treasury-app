import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Permission } from 'shared/models/permission';
import { Subscription } from 'rxjs';
import { PermissionService } from 'shared/services/permission.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';

@Component({
  selector: 'permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent {
  @Input('vault') vault: Vault;
  @Input('selectedPermission') set setSelectedPermission(value) {
    this.permission = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedPermissionChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  permission: Permission;
  currencies: Permission[];
  permissionSub: Subscription;
  selected: any[];


  constructor(
    private permissionService: PermissionService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save(permission: Permission) {
    if (permission.hasOwnProperty('key')) {
      this.permissionService.update(this.permission.key, permission);
    } else {
      permission.vault = this.vault.key;
      console.log(permission);
      this.permissionService.create(permission);
    }
    this.emitter2.emit(false);
  }

  cancel() {
    this.emitter2.emit(false);
  }

  delete() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the permission ' + this.permission.key + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.permissionService.remove(this.permission.key);
          this.emitter2.emit(false);
        }
      })
      .catch(() => {

      });
  }
}
