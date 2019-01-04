interface CurrencyData {
    key: string;
    abbreviation: string;
    multiplier: number;
    name: string;
    vault: string;
}

export class Currency implements CurrencyData {
    key = null;
    abbreviation = '';
    multiplier = 1;
    name = '';
    vault = '';
    constructor() {}
}
