interface DefaultTreasureData {
    key?: string;
    name: string;
    value: number;
    parent: string;
    edition: string;
    active: boolean;
}

export class DefaultTreasure implements DefaultTreasureData {
    key = null;
    name = '';
    value = null;
    parent = '';
    edition = '-LXtHATL6RaLGCrn-MWE';
    active = true;
    constructor() {}
}
