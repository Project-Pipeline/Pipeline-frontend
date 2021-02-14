import {Address} from "../user/Address";
import {UserWrapper} from "../user/UserDetails";
import {Zipcode} from "./Zipcode";
import {generateUUID} from "../../Global";

export class Opportunity {
    public user: UserWrapper
    constructor(
        public name: string,
        public companyName: string,
        public overview: string,
        public qualifications: string[],
        public responsibilities: string[],
        public compensation: string,
        public isFullTime: boolean,
        public address: Address,
        userId: string,
        public id: string = generateUUID()
    ) {
        this.user = new UserWrapper(userId);
    }
}

export class OpportunitiesContentsWrapper {
    constructor(
        public opportunity: Opportunity,
        public zipcode: Zipcode
    ) {
    }
}
