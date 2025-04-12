export class PageRequest {
    skip: number;
    take: number;
    constructor(skip: number | string = 0, take: number | string = 15) {
        this.skip = typeof skip === 'string' ? parseInt(skip, 10) : skip;
        this.take = typeof take === 'string' ? parseInt(take, 10) : take;
    }
}
