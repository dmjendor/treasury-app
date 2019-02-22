import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'account', component: UserAccountComponent, canActivate: [AuthGuard] }
    ])

  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    UserAccountComponent,
    PrivacyComponent,
    TermsComponent
  ],
  exports: [
    BsNavbarComponent,
  ]
})
export class CoreModule { }
