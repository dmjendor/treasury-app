interface EditionData {
    key?: string;
    name: string;
    active: boolean;
}

export class Edition implements EditionData {
    key = null;
    name = '';
    active = true;
    constructor() {}
}
