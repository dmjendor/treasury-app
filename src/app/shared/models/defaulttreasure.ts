interface DefaultTreasureData {
    key?: string;
    name: string;
    value: number;
    parent: string;
    active: boolean;
}

export class DefaultTreasure implements DefaultTreasureData {
    key = null;
    name = '';
    value = null;
    parent = '';
    active = true;
    constructor() {}
}
