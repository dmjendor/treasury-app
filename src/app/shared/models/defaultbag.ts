interface DefaultBagData {
    key?: string;
    name: string;
    active: boolean;
}

export class DefaultBag implements DefaultBagData {
    key = null;
    name = '';
    active = false;
    constructor() {}
}
