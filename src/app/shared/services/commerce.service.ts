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


  buySell(item: any, vault: Vault, sell: boolean, type: string) {
    const coin = new Coin();
    coin.vault = vault.key;
    coin.timestamp = Date.now();
    coin.changeby = sessionStorage.getItem('userId');
    switch (type) {
      case 'treasure':
        if (sell) {
          coin.value = item.value * ((100 - vault.isMarkup) / 100);
        } else {
          coin.value = (item.value * ((100 + vault.gbMarkup) / 100)) * -1;
        }
      break;
      case 'valuables':
        if (sell) {
          coin.value = item.value * ((100 - vault.gsMarkup) / 100);
        } else {
          coin.value = (item.value * ((100 + vault.gbMarkup) / 100)) * -1;
        }
      break;
    }

    coin.currency = vault.baseCurrency;
    return this.coinService.create(coin);
  }
}
