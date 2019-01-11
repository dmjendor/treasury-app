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
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  exports: [
    DnCEditComponent,
    OptionQuantityComponent,
    VaultFormComponent,
    CurrencyFormComponent,
    TreasuryFormComponent,
    ManageCurrenciesComponent,
    TreasuryNavbarListComponent,
    PermissionFormComponent,
    ManagePermissionsComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ToastaModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    VaultService,
    CurrencyService,
    ConfirmationDialogService,
    ThemeService,
    FiltersService,
    UserService,
    AuthService,
    AuthGuard,
    {provide: FunctionsRegionToken, useValue: 'asia-northeast1'}
  ]
})
export class SharedModule { }
