export class PageData<T> {
    constructor(
        public items: T[],
        public metadata: PageDataMetadata
    ) {
    }
}

export class PageDataMetadata {
    constructor(
        public page: number,
        public per: number,
        public total: number,
    ) {
    }
}
