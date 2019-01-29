interface BagData {
    key?: string;
    changeby: string;
    timestamp: Date;
    name: string;
    vault: string;
}

export class Bag implements BagData {0;
    key = null;
    changeby = '';
    timestamp = new Date();
    name = '';
    vault = '';
    constructor() {}
}
