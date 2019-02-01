interface ModifierData {
    key?: string;
    name: string;
    value: number;
    parent: string;
    active: boolean;
}

export class Modifier implements ModifierData {
    key = null;
    name = '';
    value = null;
    parent = null;
    active = true;
    constructor() {}
}
