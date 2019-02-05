import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ManageVaultsComponent } from './components/manage-vaults/manage-vaults.component';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';
import { ManageThemesComponent } from './components/manage-themes/manage-themes.component';
import { ThemeFormComponent } from './components/theme-form/theme-form.component';
import { ManageBagsComponent } from './components/manage-bags/manage-bags.component';
import { BagFormComponent } from './components/bag-form/bag-form.component';
import { ManageValuablesComponent } from './components/manage-valuables/manage-valuables.component';
import { ValuablesFormComponent } from './components/valuables-form/valuables-form.component';
import { ManageTreasuresComponent } from './components/manage-treasures/manage-treasures.component';
import { TreasureFormComponent } from './components/treasure-form/treasure-form.component';
import { ManageModifiersComponent } from './components/manage-modifiers/manage-modifiers.component';
import { ManageEditionsComponent } from './components/manage-editions/manage-editions.component';
import { EditionFormComponent } from './components/edition-form/edition-form.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { ModifierFormComponent } from './components/modifier-form/modifier-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    {
      path: 'admin',
      component: AdminConsoleComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/vaults/:id',
      component: VaultFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/vaults',
      component: ManageVaultsComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/themes/new',
      component: ThemeFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/themes/:id',
      component: ThemeFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/themes',
      component: ManageThemesComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/bags/new',
      component: BagFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/bags/:id',
      component: BagFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/bags',
      component: ManageBagsComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/valuables/new',
      component: ValuablesFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/valuables/:id',
      component: ValuablesFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/valuables',
      component: ManageValuablesComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/treasures/new',
      component: TreasureFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/treasures/:id',
      component: TreasureFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/treasures',
      component: ManageTreasuresComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/editions/new',
      component: EditionFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/editions/:id',
      component: EditionFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/editions',
      component: ManageEditionsComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/modifiers/new',
      component: ModifierFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/modifiers/:id',
      component: ModifierFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/modifiers',
      component: ManageModifiersComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    ])
  ],
  declarations: [
    ManageVaultsComponent,
    ManageThemesComponent,
    ThemeFormComponent,
    ManageBagsComponent,
    BagFormComponent,
    ManageValuablesComponent,
    ValuablesFormComponent,
    ManageTreasuresComponent,
    TreasureFormComponent,
    ManageModifiersComponent,
    ManageEditionsComponent,
    EditionFormComponent,
    AdminConsoleComponent,
    ModifierFormComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
