import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Permission } from 'shared/models/permission';
import { Vault } from 'shared/models/vault';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { PermissionService } from 'shared/services/permission.service';
import { ToastService } from 'shared/services/toast.service';
import { UserService } from 'shared/services/user.service';

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
    private toast: ToastService,
    private modalService: NgbModal,
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
    if (user.key !== sessionStorage.getItem('userId')) {
      this.confirmationDialogService.confirm(header, body)
      .then((confirmed) => {
        if (confirmed) {
          this.permissionsService.remove(this.selectedPermissions.key);
        }
      })
      .catch(() => {
        //
      });
    } else {
      this.toast.addToast('error', 'Error', 'You cannot delete your own permissions.');
    }
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

  openModal(modal) {
    this.modalService.open(modal);
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
