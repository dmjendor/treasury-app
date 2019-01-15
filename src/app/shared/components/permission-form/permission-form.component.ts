import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Permission } from 'shared/models/permission';
import { Subscription, Observable } from 'rxjs';
import { PermissionService } from 'shared/services/permission.service';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ToastService } from 'shared/services/toast.service';

@Component({
  selector: 'permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent implements OnInit, OnDestroy {
  @Input('vault') vault: Vault;
  @Input('selectedPermission') set setSelectedPermission(value) {
    this.permission = value;
  }
  @Input('edit') editMode: boolean;
  @Output('selectedPermissionChange') emitter1: EventEmitter<object> = new EventEmitter<object>();
  @Output('editChange') emitter2: EventEmitter<boolean> = new EventEmitter<boolean>();
  permission = new Permission();
  currencies: Permission[];
  permissionSub: Subscription;
  selectedItems = [];
  users: AppUser[];
  userName: string;
  userEmail: string;
  userSub: Subscription;
  searchByEmail: boolean = false;

  constructor(
    private toast: ToastService,
    private userService: UserService,
    private permissionService: PermissionService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  save(permission: Permission) {
    if (permission.hasOwnProperty('key')) {
      this.permissionService.update(this.permission.key, permission);
    } else {
      permission.vault = this.vault.key;
      if (permission.user !== '') {
        this.permissionService.create(permission);
      } else {
        this.toast.addToast('error', 'Error', 'No user selected.');

      }

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

  selected($e) {
    $e.preventDefault();
    this.userName = $e.item.name;
    this.permission.user = $e.item.key;
  }

  formatter = (result: AppUser) => result.name;

  nameSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        const matchRegExp = new RegExp(term, 'gi');
        return term.length === 0 ? [] : this.users.filter(v => {
          return this.selectedItems.indexOf(v) === -1 && matchRegExp.test(v.name);
        });
      })

  emailSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        const matchRegExp = new RegExp(term, 'gi');
        return term.length === 0 ? [] : this.users.filter(v => {
          return this.selectedItems.indexOf(v) === -1 && matchRegExp.test(v.email);
        });
      })

  async ngOnInit() {
    this.userSub = this.userService.getAll()
    .subscribe(user => {
      this.users = user as AppUser[];
    });
  }



  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
