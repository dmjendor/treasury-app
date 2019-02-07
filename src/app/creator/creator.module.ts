import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserVaultComponent } from './components/user-vault/user-vault.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CreateVaultComponent } from './components/create-vault/create-vault.component';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';
import { RewardPrepListComponent } from './components/reward-prep-list/reward-prep-list.component';
import { RewardPrepFormComponent } from './components/reward-prep-form/reward-prep-form.component';
import { DisplayPrepCoinComponent } from './components/display-prep-coin/display-prep-coin.component';
import { DisplayPrepValuablesComponent } from './components/display-prep-valuables/display-prep-valuables.component';
import { DisplayPrepTreasureComponent } from './components/display-prep-treasure/display-prep-treasure.component';
import { EditPrepTreasureComponent } from './components/edit-prep-treasure/edit-prep-treasure.component';
import { EditPrepValuablesComponent } from './components/edit-prep-valuables/edit-prep-valuables.component';
import { EditPrepCoinComponent } from './components/edit-prep-coin/edit-prep-coin.component';
import { PrepCoinInputFormComponent } from './components/prep-coin-input-form/prep-coin-input-form.component';
import { PrepCoinService } from './services/prep-coin.service';
import { PrepValuablesService } from './services/prep-valuables.service';
import { PrepTreasureService } from './services/prep-treasure.service';

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
      {
        path: 'rewardprep/new/:vaultid',
        component: RewardPrepFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rewardprep/:id',
        component: RewardPrepFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rewardprep',
        component: UserVaultComponent,
        canActivate: [AuthGuard]
      },
    ])
  ],
  declarations: [
    CreateVaultComponent,
    UserVaultComponent,
    RewardPrepListComponent,
    RewardPrepFormComponent,
    DisplayPrepCoinComponent,
    DisplayPrepValuablesComponent,
    DisplayPrepTreasureComponent,
    EditPrepTreasureComponent,
    EditPrepValuablesComponent,
    EditPrepCoinComponent,
    PrepCoinInputFormComponent
  ],
  exports: [

  ],
  providers: [
    PrepCoinService,
    PrepValuablesService,
    PrepTreasureService
  ]
})

export class CreatorModule { }
