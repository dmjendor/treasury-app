import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';

import { FiltersService } from 'shared/services/filters.service';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { VaultService } from 'shared/services/vault.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'edit-vault',
  templateUrl: './edit-vault.component.html',
  styleUrls: ['./edit-vault.component.css']
})
export class EditVaultComponent implements OnInit, OnDestroy {
  id: string;
  vault: Vault;
  currentSize: string;
  previousSize: string;
  path = localStorage.getItem('returnUrl');

  constructor(
    private vaultService: VaultService,
    private filtersService: FiltersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {

        this.vaultService.get(this.id)
          .valueChanges()
          .pipe(take(1))
          .subscribe(p => {
            this.vault = p as Vault;
        });
    }
  }

  saveVault() {
    this.vaultService.update(this.vault.key, this.vault);
    this.router.navigate([this.path]);
  }

  cancelVault() {
    this.router.navigate([this.path]);
  }



  async ngOnInit() {
  }

  ngOnDestroy() {
  }

}
