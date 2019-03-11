interface EditionData {
    key?: string;
    name: string;
    active: boolean;
    user: string;
}

export class Edition implements EditionData {
    key = null;
    name = '';
    active = true;
    user = '';
    constructor() {}
}
