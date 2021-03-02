import {Address} from "./Address";

export class UserDetails {
    public user: UserDTO;
    constructor(
        // User ID
        user: string,
        public links: DescriptionDetailPair[],
        public phoneNumbers: DescriptionDetailPair[],
        public publicID: string,
        public additionalInfo: DescriptionDetailPair[],
        public backgroundImage?: string,
        public biography?: string,
        public dateFounded?: string,
        public address?: Address,
        public dob?: string,
        public gender?: number,
        public profession?: string,
        public id?: string
    ) {
        this.user = new UserDTO(user);
    }
}

// A DTO
export class UserDTO {
    constructor(public id: string) {
    }
}

export class DescriptionDetailPair {
    constructor(
        public description: string,
        public detail: string
    ) {}
}

