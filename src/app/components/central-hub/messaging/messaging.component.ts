import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {mergeMap, takeUntil} from "rxjs/operators";
import {MessagingService} from "../../../services/messaging.service";
import {Conversation, ConversationParticipantInfo} from "../../../models/model classes/messaging/Conversation";
import {MessagingConnect} from "../../../models/model classes/messaging/MessagingConnect";
import {ConversationEntry} from "../../../models/model classes/messaging/ConversationEntry";
import {delayExecutionFor, unixTimeStampToDate} from "../../../models/Global";
import {CentralHubBaseComponent} from "../central-hub-base/central-hub-base.component";

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent extends CentralHubBaseComponent implements OnInit, OnDestroy {
    @ViewChild('centralHubMessagesDetails') private chats: ElementRef;
    heightStringForDetails: string;
    heightStringForList: string;
    currentUser: User;
    searchedUsers: User[] = [];
    currentConversations: Conversation[] = [];
    selectedConversation: Conversation = null;
    ongoingMessages: ConversationEntry[] = [];
    historicalMessages: ConversationEntry[] = [];
    messageBeingWritten = "";
    searchText = "";

    constructor(
        private userApiService: UserApiService,
        private messagingService: MessagingService) {
        super();
    }

    ngOnInit(): void {
        this.userApiService
            .getUserInfo()
            .subscribe((user) => {
                this.currentUser = user;
                this.createMessageList(this.currentUser);
            });

        this.heightChanged$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([height, heightStr]) => {
                this.heightStringForDetails = `${height - 100}px`
                this.heightStringForList = `${height - 170}px`;
            });
    }

    ngOnDestroy() {
        this.stopMessaging();
    }

    userSelected(user: User) {
        this.searchedUsers = [];
        this.messagingService
            .startConversation([this.currentUser, user])
            .pipe(mergeMap(() => this.userApiService.getUserInfo()))
            .subscribe((refreshedUser) => {
                this.createMessageList(refreshedUser);
            });
    }

    searchForUsersToMessage(method: string = 'name') {
        this.userApiService.searchUser(this.searchText, method)
            .subscribe((res) => {
                this.searchedUsers = res;
            })
    }

    createMessageList(user: User) {
        this.messagingService.messageIDToConversation(user.messages)
            .subscribe((convos) => this.currentConversations = convos);
    }

    firstConvoText(convo: Conversation): string {
        const last = convo.entries[convo.entries.length-1];
        if (last == undefined) {
            return "No Messages Yet"
        }
        if (last.text == null) {
            return "No Messages Yet"
        }
        return last.text;
    }

    imageUrlFor(convo: Conversation): string {
        return this.convoWithCurrentUserRemoved(convo)[0].profileImageURL
    }

    formatConvoUsers(convo: Conversation): string {
        return this.convoWithCurrentUserRemoved(convo)
            .map((u) => `${u.firstName} ${u.lastName}`)
            .join(', ')
    }

    private convoWithCurrentUserRemoved(convo: Conversation): ConversationParticipantInfo[] {
        return convo.participantsInfo
            .filter((u) => u.userID != this.currentUser.id)
    }

    userIdToParticipantInfo(id: string): ConversationParticipantInfo {
        return this.selectedConversation
            .participantsInfo
            .find((convo) => convo.userID === id);
    }

    conversationSelected(conversation: Conversation) {
        // stop any previous messaging
        this.stopMessaging();
        delayExecutionFor(100)
            .subscribe(() => {
                this.messagingService.startWebSocket(
                    () => {
                        this.messagingService.sendData(new MessagingConnect(conversation.id, this.currentUser.id));
                        this.selectedConversation = conversation;
                        this.historicalMessages = conversation.entries;
                        this.scrollToBottomOfChat();
                    },
                    () => {},
                    (msg) => {
                        this.ongoingMessages.push(msg as ConversationEntry);
                        this.scrollToBottomOfChat();
                    },
                    (error) => {
                        console.log("error " + error)
                    });
            });
    }

    sendText(text: string) {
        this.messagingService.sendMessage(
            new ConversationEntry(
                this.currentUser.id,
                this.selectedConversation.id,
                text
            )
        );
    }

    sendImage() {

    }

    stopMessaging() {
        this.messagingService.stopMessaging();
        this.selectedConversation = null;
        this.ongoingMessages = [];
        this.messageBeingWritten = '';
    }

    optionSelected(option: string) {

    }

    timestampToDate(timestamp: number): Date {
        return unixTimeStampToDate(timestamp);
    }

    scrollToBottomOfChat() {
        delayExecutionFor(100)
            .subscribe(() => {
                try {
                    this.chats.nativeElement.scrollTop = this.chats.nativeElement.scrollHeight;
                } catch(err) { }
            });
    }


}
