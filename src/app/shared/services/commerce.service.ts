import { Injectable } from '@angular/core';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';
import { Coin } from 'shared/models/coin';
import { Vault } from 'shared/models/vault';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  constructor(
    private coinService: TreasuryCurrencyService
  ) { }


  buySell(
    item: any,
    vault: Vault,
    sell: boolean,
    type: string,
    bypassMarkup: boolean,
    useBaseCurrency: boolean
    ) {
    const coin = new Coin();
    coin.vault = vault.key;
    coin.timestamp = Date.now();
    coin.changeby = sessionStorage.getItem('userId');
    switch (type) {
      case 'treasure':
        if (sell) {
          const mts = bypassMarkup ? 0 : vault.isMarkup;
          coin.value = item.value * ((100 - mts) / 100);
        } else {
          const mtb = bypassMarkup ? 0 : vault.ibMarkup;
          coin.value = (item.value * ((100 + mtb) / 100)) * -1;
        }
      break;
      case 'valuables':
        if (sell) {
          const mvs = bypassMarkup ? 0 : vault.gsMarkup;
          coin.value = item.value * ((100 - mvs) / 100);
        } else {
          const mvb = bypassMarkup ? 0 : vault.gbMarkup;
          coin.value = (item.value * ((100 + mvb) / 100)) * -1;
        }
      break;
    }
    if (useBaseCurrency) {
      coin.currency = vault.baseCurrency;
    } else {
      coin.currency = vault.commonCurrency;
    }

    return this.coinService.create(coin);
  }
}
