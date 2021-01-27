import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {ServerResponse} from "../models/model classes/ServerResponse";
import {apiRoot, websocketRoot} from "../models/ApiRoot";
import {ConversationEntry} from "../models/model classes/messaging/ConversationEntry";
import {Conversation, ConversationParticipantInfo} from "../models/model classes/messaging/Conversation";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {StringArray} from "../models/model classes/StringArray";
import {User} from "../models/model classes/user/User";
import {MessagingConnectionEstablished} from "../models/model classes/messaging/MessagingConnect";

@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    private webSocket: WebSocketSubject<unknown>;

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    startConversation(participants: User[]): Observable<ServerResponse> {
        const conversation = new Conversation(
            [],
            participants.map((u) => new ConversationParticipantInfo(u))
        )
        return this.http.post<ServerResponse>(
            `${apiRoot}api/messaging/start`,
            conversation,
            this.authService.authHeaders()
        )
    }

    messageIDToConversation(messageIDs: string[]): Observable<Conversation[]> {
        const stringArr = new StringArray(messageIDs);
        return this.http.post<Conversation[]>(
            `${apiRoot}api/messaging/conversation-details`,
            stringArr,
            this.authService.authHeaders()
        )
    }

    startWebSocket(
        onOpen: () => void,
        onClose: () => void,
        messageReceived: (any) => void,
        errorReceived: (any) => void
    ) {
        this.webSocket = webSocket({
            url: `${websocketRoot}api/messaging?token=${this.authService.getToken()}`,
            openObserver: { next: () => {} },
            closeObserver: { next: () => onClose() },
        });
        this.webSocket.subscribe(
            msg => {
                if ((msg as MessagingConnectionEstablished).connectionEstablished) {
                    onOpen();
                } else {
                    messageReceived(msg);
                }
            },
            err => errorReceived(err)
        )
    }

    sendData(data: unknown) {
        this.webSocket.next(data)
    }

    sendMessage(message: ConversationEntry) {
        this.webSocket.next(message);
    }

    // Close the web socket
    stopMessaging() {
        if (this.webSocket != null) {
            this.webSocket.unsubscribe();
            this.webSocket = null;
        }
    }
}
