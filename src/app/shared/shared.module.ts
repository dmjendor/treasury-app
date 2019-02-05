import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { OptionQuantityComponent } from './components/option-quantity/option-quantity.component';
import { FiltersService } from './services/filters.service';
import { DnCEditComponent } from './components/dnc-edit/dnc-edit.component';
import { VaultService } from './services/vault.service';
import { CurrencyService } from './services/currency.service';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';
import { CurrencyFormComponent } from 'shared/components/currency-form/currency-form.component';
import { ManageCurrenciesComponent } from 'shared/components/manage-currencies/manage-currencies.component';
import { TreasuryFormComponent } from './components/treasury-form/treasury-form.component';
import { ThemeService } from './services/theme.service';
import { TreasuryNavbarListComponent } from './components/treasury-navbar-list/treasury-navbar-list.component';
import { ToastaModule } from 'ngx-toasta';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { ManagePermissionsComponent } from './components/manage-permissions/manage-permissions.component';
import { PermissionFormComponent } from './components/permission-form/permission-form.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { TreasureGuard } from './services/treasure-guard.service';
import { CoinInputFormComponent } from './components/coin-input-form/coin-input-form.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { BagService } from './services/bag.service';
import { ManageVaultBagsComponent } from './components/manage-vault-bags/manage-vault-bags.component';
import { VaultBagsFormComponent } from './components/vault-bags-form/vault-bags-form.component';
import { EditTreasureComponent } from './components/edit-treasure/edit-treasure.component';
import { TreasureService } from './services/treasure.service';
import { CommerceService } from './services/commerce.service';
import { EditCurrencyComponent } from './components/edit-currency/edit-currency.component';
import { EditValuablesComponent } from './components/edit-valuables/edit-valuables.component';
import { DefaultBagService } from './services/default-bag.service';
import { DefaultValuablesService } from './services/default-valuables.service';
import { DefaultTreasureService } from './services/default-treasure.service';
import { ModifierService } from './services/modifier.service';
import { EditionService } from './services/edition.service';
import { BagsModalViewComponent } from './components/bags-modal-view/bags-modal-view.component';
import { BagsModalFormComponent } from './components/bags-modal-form/bags-modal-form.component';

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
    BagsModalFormComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
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
    BagsModalFormComponent,
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
