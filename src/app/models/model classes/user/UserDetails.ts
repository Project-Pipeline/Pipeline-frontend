export class UserDetails {
    public user: UserWrapper;
    constructor(
        // User ID
        user: string,
        public links: DescriptionDetailPair[],
        public phoneNumbers: DescriptionDetailPair[],
        public publicID: string,
        public additionalInfo: DescriptionDetailPair[],
        public backgroundImage?: string,
        public biography?: string,
        public latitude?: number,
        public longitude?: number,
        public dateFounded?: Date,
        public dob?: string,
        public gender?: number,
        public profession?: string,
        public id?: string
    ) {
        this.user = new UserWrapper(user);
    }
}

// A DTO
class UserWrapper {
    constructor(public id: string) {
    }
}

export class DescriptionDetailPair {
    constructor(
        public description: string,
        public detail: string
    ) {}
}

