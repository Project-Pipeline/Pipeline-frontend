export class PageData<T> {
    items: T[];
    metadata: PageDataMetadata;
}

export class PageDataMetadata {
    page: number;
    per: number;
    total: number;
}
