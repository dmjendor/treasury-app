export interface PrepValuableData {
    key?: string;
    vault: string;
    name: string;
    value: number;
    quantity: number;
    location: string;
    timestamp: number;
    changeby: string;
    archived: boolean;
    reward: string;
}

export class PrepValuable implements PrepValuableData {
    key = null;
    vault = '';
    name = '';
    value = null;
    quantity = null;
    location = '';
    timestamp = null;
    changeby = '';
    archived = false;
    reward = '';
    constructor() {}
}
