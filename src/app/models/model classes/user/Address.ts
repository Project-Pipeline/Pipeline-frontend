export class Address {
    constructor(
        public components: string[],
        public latitude: number,
        public longitude: number,
        public postalCode?: string
    ) {
    }
}
