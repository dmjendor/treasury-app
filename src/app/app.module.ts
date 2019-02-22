import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'core/components/home/home.component';
import { environment } from 'environments/environment';
import { VaultService } from 'shared/services/vault.service';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CreatorModule } from './creator/creator.module';
import { SharedModule } from './shared/shared.module';
import { TreasuryModule } from './treasury/treasury.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    CoreModule,
    CreatorModule,
    TreasuryModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
       { path: '', redirectTo: 'home', pathMatch: 'full'},
       // { path: 'addMessage', component: HomeComponent },
       { path: 'home', component: HomeComponent}
    ], {onSameUrlNavigation: 'reload'})
  ],
  providers: [
    VaultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
