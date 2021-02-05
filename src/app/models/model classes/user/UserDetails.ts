export class UserDetails {
    constructor(
        // User ID
        public user: string,
        public links: DescriptionDetailPair[],
        public phoneNumbers: DescriptionDetailPair[],
        public publicID: string,
        public additionalInfo: DescriptionDetailPair[],
        public backgroundImage?: string,
        public biography?: string,
        public latitude?: number,
        public longitude?: number,
        public dateFounded?: Date,
        public dob?: Date,
        public gender?: number,
        public profession?: string,
        public id?: string
    ) {}
}

export class DescriptionDetailPair {
    constructor(
        public description: string,
        public detail: string
    ) {}
}

