import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vault } from 'shared/models/vault';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router, ActivatedRoute } from '@angular/router';
import { VaultService } from 'shared/services/vault.service';

@Component({
  selector: 'user-vault',
  templateUrl: './user-vault.component.html',
  styleUrls: ['./user-vault.component.css']
})
export class UserVaultComponent implements OnInit, OnDestroy {

  itemCount: number;
  selected: any[];
  appUser: AppUser;
  vault$;
  vault: Vault[];
  vaultSub: Subscription;
  selectedVault: Vault;

  userId: string;
  userSubscription: Subscription;

    columns = [
      { prop: 'name' },
      { name: 'Theme'},
      { name: 'Active' }
    ];

    constructor(
      private vaultService: VaultService,
      private authService: AuthService,
      private router: Router
    ) {
    }

    editVault(row) {
      localStorage.setItem('returnUrl', '/vault');
      this.router.navigate(['/vault/' + row.key]);
    }

    deleteVault(row) {
      this.vaultService.remove(row.key);
    }

    onSelect({ selected }) {
      this.selectedVault = this.selected[0];
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.vault.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.vault;
    }

    reloadItems(params) {
    }

    transform(source: Vault[]) {
      const dest: Vault[] = [];

      for (const sourceItem of source) {
        const destItem = {...sourceItem};
        dest.push(destItem);
      }
    }

    async ngOnInit() {

      this.userSubscription = this.authService.user$.subscribe(user => {
        this.userId = user.uid;
        console.log(this.userId);
        this.vaultService.getVaultByOwner(this.userId)
        .subscribe(vault => {
          this.vault = vault as Vault[];
          this.selected = [vault[0]];
          this.selectedVault = vault[0] as Vault;
        });
      });

      this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }


  }

