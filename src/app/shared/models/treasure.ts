export interface TreasureData {
    key?: string;
    vault: string;
    name: string;
    genericname: string;
    description: string;
    value: number;
    quantity: number;
    location: string;
    timestamp: number;
    changeby: string;
    identified: boolean;
    archived: boolean;
}

export class Treasure implements TreasureData {
    key = null;
    vault = '';
    name = '';
    genericname = '';
    description = '';
    value = null;
    quantity = null;
    location = '';
    timestamp = null;
    changeby = '';
    identified = true;
    archived = false;
    constructor() {}
}
