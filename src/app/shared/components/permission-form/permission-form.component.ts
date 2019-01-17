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
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

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
  permission: Permission;
  selectedItems = [];
  users: AppUser[];
  currentUser: AppUser;
  userName: string;
  userEmail: string;
  userSub: Subscription;
  searchByEmail: boolean = false;
  id: string;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    private permissionService: PermissionService,
    private confirmationDialogService: ConfirmationDialogService
    ) {

  }

  save() {
    console.log(this.permission.key);
    if (this.permission.key !== null) {
      const key =  this.permission.key;
      delete this.permission.key; // remove key from object
      this.permissionService.update(key, this.permission);
    } else {
      this.permission.vault = this.vault.key;
      if (this.permission.user !== '') {
        this.permissionService.create(this.permission);
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
    this.userEmail = $e.item.email;
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

  // emailSearch = (text$: Observable<string>) =>
  //   text$
  //     .debounceTime(200)
  //     .distinctUntilChanged()
  //     .map(term => {
  //       const matchRegExp = new RegExp(term, 'gi');
  //       return term.length === 0 ? [] : this.users.filter(v => {
  //         return this.selectedItems.indexOf(v) === -1 && matchRegExp.test(v.email);
  //       });
  //     })

  async ngOnInit() {
    this.userSub = this.userService.getAll()
    .subscribe(user => {
      this.users = user as AppUser[];
      console.log(this.permission);
      if (this.permission.key) {
        this.currentUser = this.users.find((usr) => usr.key === this.permission.user);
        this.userName = this.currentUser.name;
      } else {
        this.permission = new Permission();
      }
    });
  }



  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
