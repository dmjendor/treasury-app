export interface RewardPrepData {
    key?: string;
    archived: boolean;
    name: string;
    vault: string;
    owner: string;
    timestamp: number;
}

export class RewardPrep implements RewardPrepData {
    key = null;
    archived = false;
    name = '';
    vault = '';
    owner = '';
    timestamp = null;

    constructor() {}
}
