export interface VaultData {
    key?: string;
    active: boolean;
    name: string;
    baseCurrency: string;
    commonCurrency: string;
    gbMarkup: number;
    gsMarkup: number;
    ibMarkup: number;
    isMarkup: number;
    owner: string;
    treasurySplit: boolean;
    mergeSplit: boolean;
    theme: string;
}

export class Vault implements VaultData {
    key = null;
    active = true;
    name = '';
    baseCurrency = '0';
    commonCurrency = '0';
    gbMarkup = 0;
    gsMarkup = 0;
    ibMarkup = 0;
    isMarkup = 0;
    owner = '';
    treasurySplit = true;
    mergeSplit = false;
    theme = '0';
    constructor() {}
}
