import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { HomeComponent } from 'core/components/home/home.component';
import { environment } from 'environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CreatorModule } from './creator/creator.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreasuryModule } from './treasury/treasury.module';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
