export interface PermissionData {
    key: string;
    view: boolean;
    gja: boolean;
    item: boolean;
    coin: boolean;
    user: string;
    vault: string;
}

export class Permission implements PermissionData {
    key = null;
    view = true;
    gja = false;
    item = false;
    coin = false;
    user = '';
    vault = '';
    constructor() {}
}
