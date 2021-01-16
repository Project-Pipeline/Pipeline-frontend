import {ConversationEntry} from "./ConversationEntry";
import {User} from "../user/User";
import {dateAsUnixTimeStamp, generateUUID} from "../../Global";

export class Conversation {
    constructor(
        public entries: ConversationEntry[],
        public participantsInfo: ConversationParticipantInfo[],
        public id: string = generateUUID(),
        public created: number = dateAsUnixTimeStamp(),
        public modified: number = dateAsUnixTimeStamp(),
    ) {
    }
}

export class ConversationParticipantInfo {
    firstName: string;
    lastName: string;
    profileImageURL: string;
    userID: string;
    constructor(user: User) {
        this.firstName = user.givenName;
        this.lastName = user.familyName;
        this.profileImageURL = user.picture;
        this.userID = user.id;
    }
}
