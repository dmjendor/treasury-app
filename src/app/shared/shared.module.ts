import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { ToastaModule } from 'ngx-toasta';
import { CurrencyFormComponent } from 'shared/components/currency-form/currency-form.component';
import { ManageCurrenciesComponent } from 'shared/components/manage-currencies/manage-currencies.component';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';

import { BagsModalViewComponent } from './components/bags-modal-view/bags-modal-view.component';
import { CoinInputFormComponent } from './components/coin-input-form/coin-input-form.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DnCEditComponent } from './components/dnc-edit/dnc-edit.component';
import { EditCurrencyComponent } from './components/edit-currency/edit-currency.component';
import { EditTreasureItemComponent } from './components/edit-treasure-item/edit-treasure-item.component';
import { EditTreasureComponent } from './components/edit-treasure/edit-treasure.component';
import { EditValuablesComponent } from './components/edit-valuables/edit-valuables.component';
import { ManagePermissionsComponent } from './components/manage-permissions/manage-permissions.component';
import { ManageVaultBagsComponent } from './components/manage-vault-bags/manage-vault-bags.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { OptionQuantityComponent } from './components/option-quantity/option-quantity.component';
import { PermissionFormComponent } from './components/permission-form/permission-form.component';
import { TreasuryFormComponent } from './components/treasury-form/treasury-form.component';
import { TreasuryNavbarListComponent } from './components/treasury-navbar-list/treasury-navbar-list.component';
import { VaultBagsFormComponent } from './components/vault-bags-form/vault-bags-form.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BagService } from './services/bag.service';
import { CommerceService } from './services/commerce.service';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { CurrencyService } from './services/currency.service';
import { DefaultBagService } from './services/default-bag.service';
import { DefaultTreasureService } from './services/default-treasure.service';
import { DefaultValuablesService } from './services/default-valuables.service';
import { EditionService } from './services/edition.service';
import { FiltersService } from './services/filters.service';
import { ModifierService } from './services/modifier.service';
import { ThemeService } from './services/theme.service';
import { TreasureGuard } from './services/treasure-guard.service';
import { TreasureService } from './services/treasure.service';
import { UserService } from './services/user.service';
import { VaultService } from './services/vault.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    NgbModule.forRoot(),
    ToastaModule.forRoot(),
  ],
  declarations: [
    OptionQuantityComponent,
    DnCEditComponent,
    VaultFormComponent,
    CurrencyFormComponent,
    ManageCurrenciesComponent,
    TreasuryFormComponent,
    TreasuryNavbarListComponent,
    ConfirmationDialogComponent,
    ManagePermissionsComponent,
    PermissionFormComponent,
    NoAccessComponent,
    CoinInputFormComponent,
    SanitizerPipe,
    ManageVaultBagsComponent,
    VaultBagsFormComponent,
    EditTreasureComponent,
    EditCurrencyComponent,
    EditValuablesComponent,
    BagsModalViewComponent,
    EditTreasureItemComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    EditTreasureItemComponent,
    BagsModalViewComponent
  ],
  exports: [
    CoinInputFormComponent,
    DnCEditComponent,
    OptionQuantityComponent,
    VaultFormComponent,
    CurrencyFormComponent,
    TreasuryFormComponent,
    ManageCurrenciesComponent,
    TreasuryNavbarListComponent,
    PermissionFormComponent,
    ManagePermissionsComponent,
    ManageVaultBagsComponent,
    VaultBagsFormComponent,
    EditTreasureComponent,
    EditCurrencyComponent,
    EditValuablesComponent,
    BagsModalViewComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ToastaModule,
    SanitizerPipe,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    BagService,
    VaultService,
    CurrencyService,
    ConfirmationDialogService,
    ThemeService,
    FiltersService,
    UserService,
    TreasureService,
    CommerceService,
    DefaultBagService,
    DefaultValuablesService,
    DefaultTreasureService,
    ModifierService,
    EditionService,
    AuthService,
    AuthGuard,
    TreasureGuard,
    {provide: FunctionsRegionToken, useValue: 'asia-northeast1'}
  ]
})
export class SharedModule { }
