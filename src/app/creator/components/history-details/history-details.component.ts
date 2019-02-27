import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { Bag } from 'shared/models/bag';
import { Differences } from 'shared/models/differences';
import { Treasure } from 'shared/models/treasure';
import { Valuable } from 'shared/models/valuable';
import { Vault } from 'shared/models/vault';
import { BagService } from 'shared/services/bag.service';
import { TreasureService } from 'shared/services/treasure.service';
import { UserService } from 'shared/services/user.service';
import { UtilityService } from 'shared/services/utility.service';
import { ValuablesService } from 'shared/services/valuables.service';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  id: string;
  item: any;
  vault: Vault;
  bagList: Bag[] = [];
  bagSub: Subscription;
  vaultList: Vault[] = [];
  vaultSub: Subscription;
  userList: AppUser[] = [];
  userSub: Subscription;
  history: Differences;
  treasureList: Treasure[] = [];
  valuablesList: Valuable[] = [];

  constructor(
    public modal: NgbActiveModal,
    private route: ActivatedRoute,
    private bagService: BagService,
    private userService: UserService,
    private vaultService: VaultService,
    private utilityService: UtilityService,
    private treasureService: TreasureService,
    private valuablesService: ValuablesService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    this.vaultSub = this.vaultService.getAll()
      .subscribe((vlt) => this.vaultList = vlt as Vault[]);
    this.bagSub = this.bagService.getAll()
    .subscribe((bg) => this.bagList = bg as Bag[]);
    this.userSub = this.userService.getAll()
      .subscribe((usr) => this.userList = usr as AppUser[]);
  }

  ngOnDestroy() {
    this.bagSub.unsubscribe();
    this.userSub.unsubscribe();
    this.vaultSub.unsubscribe();
  }

  ngAfterViewInit() {
    switch (this.history.source) {
      case 'treasure':
        this.treasureService.get(this.history.itemkey)
        .valueChanges().pipe(take(1)).subscribe(t => {
          this.item = t as Treasure;
        });
      break;
      case 'valuables':
      this.valuablesService.get(this.history.itemkey)
        .valueChanges().pipe(take(1)).subscribe(v => {
          this.item = v as Valuable;
        });
      break;
      case 'bag':
      this.bagService.get(this.history.itemkey)
        .valueChanges().pipe(take(1)).subscribe(b => {
          this.item = b as Bag;
        });
      break;
    }
  }

  getItemName(type: string, value: string) {

  }


  getData(type: string, value: string) {
    if (type) {
      let response: string;
      let list: any[] = [];
      switch (type) {
        case 'changeby':
        case 'user':
          list = this.userList;
        break;
        case 'vault':
          list = this.vaultList;
        break;
        case 'location':
          list = this.bagList;
        break;

      }
      if (list.length > 0) {
        for (let l = 0; l < list.length; l++) {
          if (list[l].key === value) {
            response = list[l].name;
          }
        }
      } else {
        if (type === 'timestamp' && value) {
          response = this.formatDate(value);
        } else {
          response = value;
        }
      }
      return response;
    }
  }

  formatDate(date: string) {
    return this.utilityService.formatDate(date, true);
  }

  save() {

  }

  delete() {

  }

  cancel() {
    this.modal.close();
  }

}
