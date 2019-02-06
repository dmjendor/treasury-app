interface PrepCoinData {
    key?: string;
    changeby: string;
    currency: string;
    archived: boolean;
    timestamp: number;
    value: number;
    vault: string;
    reward: string;
}

export class PrepCoin implements PrepCoinData {
    key = null;
    changeby = '';
    currency = '';
    archived = false;
    timestamp = null;
    value = 0;
    vault = '';
    reward = '';
    constructor() {}
}
