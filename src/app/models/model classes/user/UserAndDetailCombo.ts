import {User} from "./User";
import {UserDetails} from "./UserDetails";

export class UserAndDetailCombo {
    constructor(
        public user: User,
        public userDetails: UserDetails
    ) {
    }
}
