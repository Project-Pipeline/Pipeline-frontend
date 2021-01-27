import {dateAsUnixTimeStamp, generateUUID} from "../../Global";

export class ConversationEntry {
    timeStamp: number;
    text?: string;
    imageURL?: string;
    fileURL?: string;
    senderUserID: string;
    conversationBelongedTo: string;

    constructor(senderUserID: string, convoBelongedTo: string, text: string = null,
                imageUrl: string = null, fileURL: string = null) {
        this.senderUserID = senderUserID;
        this.conversationBelongedTo = convoBelongedTo;
        this.text = text;
        this.imageURL = imageUrl;
        this.timeStamp = dateAsUnixTimeStamp();
        this.fileURL = fileURL;
    }
}
