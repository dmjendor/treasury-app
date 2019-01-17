interface AppUserData {
    key?: string;
    name: string;
    email: string;
    role: string;
}

export class AppUser implements AppUserData {
    key = null;
    name = '';
    email = '';
    role = 'User';
    constructor() {}
}
