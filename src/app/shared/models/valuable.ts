export interface ValuableData {
    key?: string;
    vault: string;
    name: string;
    value: number;
    quantity: number;
    location: string;
    timestamp: Date;
    changeby: string;
    archived: boolean;
}

export class Valuable implements ValuableData {
    key = null;
    vault = '';
    name = '';
    value = null;
    quantity = null;
    location = '';
    timestamp = new Date();
    changeby = '';
    archived = false;
    constructor() {}
}
