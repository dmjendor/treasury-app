interface DateTimeData {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
}

export class DateTime implements DateTimeData {
    year = 'numeric';
    month = 'long';
    day = 'numeric';
    hour =  null;
    minute = null;
    constructor() {}
}
