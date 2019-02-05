interface ModifierData {
    key?: string;
    name: string;
    value: number;
    parent: string;
    edition: string;
    active: boolean;
}

export class Modifier implements ModifierData {
    key = null;
    name = '';
    value = null;
    parent = null;
    edition = '-LXtHATL6RaLGCrn-MWE';
    active = true;
    constructor() {}
}
