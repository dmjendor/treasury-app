import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Permission } from 'shared/models/permission';
import { Subscription } from 'rxjs';
import { PermissionService } from 'shared/services/permission.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { UserService } from 'shared/services/user.service';
import { User } from 'firebase';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input('vault') vault: Vault;
  @Input('selectedPermission') selectedPermissions: Permission;
  @Input('edit') editMode: boolean;
  @Output('selectedPermissionChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();

  permissions: Permission[];
  permissionsSub: Subscription;
  selected: any[];
  newPermissions = new Permission();
  userSub: Subscription;
  users: AppUser[];
  showDisplay: boolean = false;

  columns = [
    { prop: 'user', name: 'User' },
    { name: 'View' },
    { name: 'Coin'},
    { name: 'Gja'},
    { name: 'Item'}
  ];
  constructor(
    private userService: UserService,
    private permissionsService: PermissionService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  toggleDisplay() {
    this.showDisplay = !this.showDisplay;
  }
  createPermission() {
    this.emitter1.emit(this.newPermissions);
    this.emitter2.emit(true);
  }

  editPermission() {
    this.emitter1.emit(this.selectedPermissions);
    this.emitter2.emit(true);
  }

  deletePermission() {
    const user = this.users.find((usr) => usr.key === this.selectedPermissions.user);
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the permissions for ' + user.name + '?  This action cannot be undone.';
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.permissionsService.remove(this.selectedPermissions.key);
        }
      })
      .catch(() => {
        //
      });
  }

  onSelect({ selected }) {
    this.selectedPermissions = selected[0];
  }

  onActivate(event) {

  }

  filter(query: string) {

  }

  getUserName(userId) {
    if (this.users && this.users.length > 0) {
      const cu = this.users.find((user) => user.key === userId);
      return cu.name;
    }
  }

  ngOnChanges() {
    if (this.vault.key) {
      this.permissionsSub = this.permissionsService.getPermissionsByVault(this.vault.key)
      .subscribe(cls => {
        this.permissions = cls as Permission[];
        this.selected = [];
      });
    }
  }

  async ngOnInit() {
    this.userSub = this.userService.getAll()
      .subscribe(user => {
        this.users = user as AppUser[];
      });
  }

  ngOnDestroy() {
    this.permissionsSub.unsubscribe();
  }

}
