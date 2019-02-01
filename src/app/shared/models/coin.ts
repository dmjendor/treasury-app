interface CoinData {
    key?: string;
    changeby: string;
    currency: string;
    archived: boolean;
    timestamp: number;
    value: number;
    vault: string;
}

export class Coin implements CoinData {
    key = null;
    changeby = '';
    currency = '';
    archived = false;
    timestamp = null;
    value = 0;
    vault = '';
    constructor() {}
}
