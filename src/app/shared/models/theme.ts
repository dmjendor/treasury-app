export interface ThemeData {
    key?: string;
    active: boolean;
    name: string;
    file: string;
}

export class Theme implements ThemeData {
    key = null;
    active = true;
    name = '';
    file = '';
    constructor() {}
}
