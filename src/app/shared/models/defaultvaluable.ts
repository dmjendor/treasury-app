interface DefaultValuableData {
    key?: string;
    name: string;
    lowvalue: number;
    highvalue: number;
    parent: string;
    active: boolean;
}

export class DefaultValuable implements DefaultValuableData {
    key = null;
    name = '';
    lowvalue = null;
    highvalue = null;
    parent = '';
    active = true;
    constructor() {}
}
