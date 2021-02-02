export class User {
    constructor(
        public email: string,
        public givenName: string,
        public familyName: string,
        public picture: string,
        public entityBelongedTo: string,
        public entityName: string,
        public industryType: string,
        public industry: string,
        public type: number,
        public messages: string[],
        public id: string = null,
    ) {
    }
}

export class UserEmail {
    constructor(public email: string) {
    }
}
