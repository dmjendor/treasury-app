import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserVaultComponent } from './components/user-vault/user-vault.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CreateVaultComponent } from './components/create-vault/create-vault.component';
import { EditVaultComponent } from './components/edit-vault/edit-vault.component';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'vaults/new',
        component: CreateVaultComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vaults/:id',
        component: VaultFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'vaults',
        component: UserVaultComponent,
        canActivate: [AuthGuard]
      },
    ])
  ],
  declarations: [
    CreateVaultComponent,
    UserVaultComponent,
    EditVaultComponent
  ],
  exports: [
    EditVaultComponent
  ]
})

export class CreatorModule { }
