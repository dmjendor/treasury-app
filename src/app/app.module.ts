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


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    CoreModule,
    CreatorModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
       { path: '', redirectTo: 'home', pathMatch: 'full'},
       { path: 'home', component: HomeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
