import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Edition } from 'shared/models/edition';
import { ConfirmationDialogService } from 'shared/services/confirmation-dialog.service';
import { EditionService } from 'shared/services/edition.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'manage-editions',
  templateUrl: './manage-editions.component.html',
  styleUrls: ['./manage-editions.component.css']
})
export class ManageEditionsComponent implements OnInit, OnDestroy {
  editions: Edition[];
  editionsSub: Subscription;
  selectedEdition: Edition;
  users: AppUser[];
  userSub: Subscription;
  selected: any;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'user' },
    { name: 'Active' }
  ];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private editionService: EditionService,
    private userService: UserService,
    private router: Router
    ) {
    }

  createEdition() {
    this.router.navigate(['/admin/editions/new']);
  }

  getParentName(key: string) {
    if (this.editions && key) {
      const val = this.editions.find(vl => vl.key === key);
      return val.name;
    }
  }

  editEdition() {
    localStorage.setItem('returnUrl', '/admin/editions');
    this.router.navigate(['/admin/editions/' + this.selectedEdition.key]);
  }

  deleteEdition() {
    const header: string = 'Please confirm..';
    const body: string = 'Are you sure you wish to delete the edition ' + this.selectedEdition.name + '?  This action cannot be undone, and will delete all associated default treasures and valuables.';
    this.confirmationDialogService.confirm(header, body)
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

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
    // const filteredProducts = (query) ? ;
      // this.editions.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      // this.editions;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  getUserName(userId) {
    if (userId && this.users && this.users.length > 0) {
      const cu = this.users.find((user) => user.key === userId);
      return cu.name;
    }
  }

  async ngOnInit() {
    this.editionsSub = this.editionService.getAll()
    .subscribe(cls => {
      this.editions = cls as Edition[];
      this.selected = [this.editions[0]];
      this.selectedEdition = this.editions[0];
    });

    this.userSub = this.userService.getAll()
    .subscribe(user => {
      this.users = user as AppUser[];
    });
  }

  ngOnDestroy() {
     this.editionsSub.unsubscribe();
     this.userSub.unsubscribe();
  }
}


