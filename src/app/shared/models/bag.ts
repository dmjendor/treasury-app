interface BagData {
    key?: string;
    changeby: string;
    timestamp: Date;
    name: string;
    vault: string;
    hidden?: boolean;
}

export class Bag implements BagData {
    key = null;
    changeby = '';
    timestamp = new Date();
    name = '';
    vault = '';
    hidden = false;
    constructor() {}
}
