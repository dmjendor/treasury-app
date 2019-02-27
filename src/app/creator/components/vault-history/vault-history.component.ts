import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { Differences } from 'shared/models/differences';
import { Page } from 'shared/models/page';
import { Vault } from 'shared/models/vault';
import { LoggingService } from 'shared/services/logging.service';
import { UserService } from 'shared/services/user.service';
import { UtilityService } from 'shared/services/utility.service';
import { VaultService } from 'shared/services/vault.service';

import { HistoryDetailsComponent } from '../history-details/history-details.component';



@Component({
  selector: 'app-vault-history',
  templateUrl: './vault-history.component.html',
  styleUrls: ['./vault-history.component.css']
})
export class VaultHistoryComponent implements OnInit, OnDestroy {
  id: string;
  logSub: Subscription;
  logList: Differences[];
  userSub: Subscription;
  userList: AppUser[] = [];
  vault: Vault;
  cPage = new Page();
  cIsLoading: boolean = false;

  logColumns = [
    { name: 'Source' },
    { name: 'ChangeBy' },
    { name: 'Timestamp' },
    { name: 'Details' }
  ];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UserService,
    private vaultService: VaultService,
    private loggingService: LoggingService,
    private utilityService: UtilityService,

  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.vaultService.get(this.id)
      .valueChanges().pipe(take(1)).subscribe(p => {
        this.vault = p as Vault;
        this.vault.key = this.id;
        this.logSub = this.loggingService.getLogsByVault(this.vault.key)
        .subscribe(val => {
          this.logList = val as Differences[];
        });
      });
  }

  ngOnInit() {
    this.userSub = this.userService.getAll()
      .subscribe((usr) => this.userList = usr as AppUser[]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.logSub.unsubscribe();
  }

  getName(name: string) {
    if (name && this.userList && this.userList.length > 0) {
      for (let u = 0; u < this.userList.length; u++) {
        if (this.userList[u].key === name) {
          return this.userList[u].name;
        }
      }
    }
  }

  formatDate(date: string) {
    return this.utilityService.formatDate(date, true);
  }

  historyDetails(row: Differences) {
    const activeModal = this.modalService.open(HistoryDetailsComponent, {ariaLabelledBy: (this.utilityService.toTitleCase(row.source) + ' ' + this.formatDate(row.timestamp + '')) });
    activeModal.componentInstance.vault = this.vault;
    if (row.changes.key) { delete row.changes.key; }
    // convert row.changes into array of objects that contains key as value
    row.changes = Object.keys(row.changes).map(e => {
      row.changes[e].home = e;
        return row.changes[e];
    });
    activeModal.componentInstance.history = row;
  }

  formatNumber(input: number) {
    const retVal = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return  retVal;
  }

}
