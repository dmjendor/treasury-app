import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ManageVaultsComponent } from './components/manage-vaults/manage-vaults.component';
import { VaultFormComponent } from 'shared/components/vault-form/vault-form.component';
import { ManageThemesComponent } from './components/manage-themes/manage-themes.component';
import { ThemeFormComponent } from './components/theme-form/theme-form.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    {
      path: 'admin/vaults/new',
      component: VaultFormComponent,
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
    ])
  ],
  declarations: [
    ManageVaultsComponent,
    ManageThemesComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
