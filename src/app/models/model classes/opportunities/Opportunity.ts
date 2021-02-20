import {Address} from "../user/Address";
import {UserWrapper} from "../user/UserDetails";
import {Zipcode} from "./Zipcode";
import {dateAsUnixTimeStamp, generateUUID} from "../../Global";
import {OpportunityCategory} from "./OpportunityCategory";

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
        public category: string,
        public due: number,
        public gradesWanted: number[],
        userId: string,
        public created: number = dateAsUnixTimeStamp(),
        public state: number = 0,
        public id: string = generateUUID()
    ) {
        this.user = new UserWrapper(userId);
    }
}

export class OpportunitiesContentsWrapper {
    constructor(
        public opportunity: Opportunity,
        public zipcode: Zipcode,
        public category: OpportunityCategory
    ) {
    }
}
