import { NgModule } from '@angular/core';
 import { HomeComponent } from './components/home/home.component';
 import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AuthGuard } from 'shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'account', component: UserAccountComponent, canActivate: [AuthGuard] }
    ])

  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    UserAccountComponent,
  ],
  exports: [
    BsNavbarComponent,
  ]
})
export class CoreModule { }
