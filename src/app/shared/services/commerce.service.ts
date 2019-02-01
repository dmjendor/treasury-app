import { Injectable } from '@angular/core';
import { Vault } from 'shared/models/vault';
import { Coin } from 'shared/models/coin';
import { TreasuryCurrencyService } from 'app/treasury/services/treasury-currency.service';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  constructor(
    private coinService: TreasuryCurrencyService
  ) { }


  buySell(item: any, vault: Vault, sell) {
    const coin = new Coin();
    coin.vault = vault.key;
    coin.timestamp = Date.now();
    coin.changeby = sessionStorage.getItem('userId');
    coin.value = !sell ? item.value * -1 : item.value;
    coin.currency = vault.baseCurrency;
    return this.coinService.create(coin);
  }
}
