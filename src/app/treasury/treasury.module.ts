import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { TreasuryDisplayComponent } from './components/treasury-display/treasury-display.component';
import { NoAccessComponent } from 'shared/components/no-access/no-access.component';
import { TreasureGuard } from 'shared/services/treasure-guard.service';
import { DisplayCurrencyComponent } from './components/display-currency/display-currency.component';
import { EditCurrencyComponent } from './components/edit-currency/edit-currency.component';
import { TreasuryCurrencyService } from './services/treasury-currency.service';
import { SplitCurrencyComponent } from './components/split-currency/split-currency.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'treasury/:id', component: TreasuryDisplayComponent, canActivate: [TreasureGuard], runGuardsAndResolvers: 'always' },
      { path: 'treasury', component: NoAccessComponent },
      { path: 'noAccess', component: NoAccessComponent }
    ])

  ],
  declarations: [
    DisplayCurrencyComponent,
    EditCurrencyComponent,
    TreasuryDisplayComponent,
    SplitCurrencyComponent
  ],
  providers: [
    TreasuryCurrencyService
  ]
})
export class TreasuryModule { }
