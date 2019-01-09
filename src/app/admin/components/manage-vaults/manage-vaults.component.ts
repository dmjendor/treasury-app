import { Component, OnInit, OnDestroy } from '@angular/core';
import { VaultService } from 'shared/services/vault.service';
import { Router } from '@angular/router';
import { Vault } from 'shared/models/vault';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'manage-vaults',
  templateUrl: './manage-vaults.component.html',
  styleUrls: ['./manage-vaults.component.css']
})
export class ManageVaultsComponent implements OnInit, OnDestroy {
  vaults: Vault[];
  vaultSub: Subscription;
  selected: any[];
  selectedVault: Vault;
  columns = [
    { prop: 'name', name: 'Name' },
    { name: 'Active' }
  ];

  constructor(
    private vaultService: VaultService,
    private modalService: NgbModal,
    private router: Router
    ) {
    }

  createVault() {
    this.router.navigate(['/admin/vaults/new']);
  }

  editVault() {
    localStorage.setItem('returnUrl', '/admin/vaults');
    this.router.navigate(['/admin/vaults/' + this.selectedVault.key]);
  }

  deleteVault() {
    this.vaultService.remove(this.selectedVault.key);
  }

  onSelect({ selected }) {
    this.selectedVault = this.selected[0];
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  filter(query: string) {
     const filteredProducts = (query) ?
      this.vaults.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.vaults;
    // this.initializeTable(filteredProducts);

  }

  reloadItems(params) {

  }

  async ngOnInit() {

    this.vaultSub = this.vaultService.getAll()
    .subscribe(cls => {
      this.vaults = cls as Vault[];
      this.selected = [this.vaults[0]];
      this.selectedVault = this.vaults[0];
    });
  }

  ngOnDestroy() {
    this.vaultSub.unsubscribe();
  }

}
