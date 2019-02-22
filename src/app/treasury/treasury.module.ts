import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoAccessComponent } from 'shared/components/no-access/no-access.component';
import { TreasureGuard } from 'shared/services/treasure-guard.service';
import { SharedModule } from 'shared/shared.module';

import { DisplayCurrencyComponent } from './components/display-currency/display-currency.component';
import { DisplayTreasureComponent } from './components/display-treasure/display-treasure.component';
import { DisplayValuablesComponent } from './components/display-valuables/display-valuables.component';
import { SplitCurrencyComponent } from './components/split-currency/split-currency.component';
import { TreasuryDisplayComponent } from './components/treasury-display/treasury-display.component';
import { TreasuryCurrencyService } from './services/treasury-currency.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'treasury/:id',
        component: TreasuryDisplayComponent,
        canActivate: [TreasureGuard],
        runGuardsAndResolvers: 'always'
      },
      { path: 'treasury', component: NoAccessComponent },
      { path: 'noAccess', component: NoAccessComponent }
    ])

  ],
  declarations: [
    DisplayCurrencyComponent,
    TreasuryDisplayComponent,
    SplitCurrencyComponent,
    DisplayValuablesComponent,
    DisplayTreasureComponent
  ],
  providers: [
    TreasuryCurrencyService
  ]
})
export class TreasuryModule { }
