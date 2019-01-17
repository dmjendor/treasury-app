interface CoinData {
    key?: string;
    changeby: string;
    currency: string;
    archived: boolean;
    timestamp: Date;
    value: number;
    vault: string;
}

export class Coin implements CoinData {0;
    key = null;
    changeby = '';
    currency = '';
    archived = false;
    timestamp = new Date();
    value = 0;
    vault = '';
    constructor() {}
}
