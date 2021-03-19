import {User} from "../../../models/model classes/user/User";
import {UserDetails} from "../../../models/model classes/user/UserDetails";

export interface ProfileTabComponent {
    userInfo: User;
    userDetails: UserDetails;
    userDetailSet: (details: UserDetails) => void;
}
