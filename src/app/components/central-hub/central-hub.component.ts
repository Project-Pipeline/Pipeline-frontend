import {AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, interval, Observable, of} from "rxjs";
import {UserApiService} from "../../services/user-api.service";
import {User} from "../../models/model classes/user/User";
import {debounce, delay, filter, map, mergeMap, switchMap} from "rxjs/operators";
import {MessagingService} from "../../services/messaging.service";
import {Conversation} from "../../models/model classes/messaging/Conversation";
import {MessagingConnect} from "../../models/model classes/messaging/MessagingConnect";
import {ConversationEntry} from "../../models/model classes/messaging/ConversationEntry";

@Component({
    selector: 'app-central-hub',
    templateUrl: './central-hub.component.html',
    styleUrls: ['./central-hub.component.scss']
})
export class CentralHubComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() currentUser: User;
    searchedUsers: Observable<User[]>;
    @ViewChild('searchUserBox') searchBox;
    currentConversations: Conversation[] = [];
    selectedConversation: Conversation = null;
    ongoingMessages: ConversationEntry[] = [];
    historicalMessages: ConversationEntry[] = [];
    messageBeingWritten = ""

    constructor(private userApiService: UserApiService, private messagingService: MessagingService) {
    }

    ngOnInit(): void {
        this.createMessageList(this.currentUser);
    }

    ngOnDestroy() {
        this.messagingService.stopMessaging();
    }

    @HostListener('window:beforeunload', [ '$event' ])
    beforeUnloadHandler(event) {
        this.messagingService.stopMessaging();
    }

    ngAfterViewInit() {
        this.searchedUsers = fromEvent<KeyboardEvent>(this.searchBox.nativeElement, 'keyup')
            .pipe(map(x => (x.currentTarget as HTMLInputElement).value))
            .pipe(filter((s) => s !== ''))
            .pipe(debounce(() => interval(500)))
            .pipe(switchMap((term) => this.userApiService.searchUser(term, "name")))
    }

    userSelected(user: User) {
        this.messagingService
            .startConversation([this.currentUser, user])
            .pipe(mergeMap(() => this.userApiService.getUserInfo()))
            .subscribe((refreshedUser) => {
                this.createMessageList(refreshedUser);
            });
    }

    createMessageList(user: User) {
        this.messagingService.messageIDToConversation(user.messages)
            .subscribe((convos) => this.currentConversations = convos);
    }

    firstConvoText(convo: Conversation): string {
        const first = convo.entries[0];
        if (first == undefined) {
            return "No Messages Yet"
        }
        return first.text ?? "No Messages Yet";
    }

    formatConvoUsers(convo: Conversation): string {
        return convo.participantsInfo
            .map((u) => `${u.firstName} ${u.lastName}`)
            .join(', ')
    }

    userIdToUserName(id: string): string {
        return this.selectedConversation
            .participantsInfo
            .find((convo) => convo.userID === id)
            .firstName;
    }

    conversationSelected(conversation: Conversation) {
        this.messagingService.startWebSocket(
            () => {
                of("")
                    .pipe(delay(100))
                    .subscribe(() => {
                        this.messagingService.sendData(new MessagingConnect(conversation.id, this.currentUser.id));
                        this.selectedConversation = conversation;
                        this.historicalMessages = conversation.entries;
                    })
            },
            () => {},
            (msg) => {
                this.ongoingMessages.push(msg as ConversationEntry);
            },
            (error) => {
                console.log("error " + error)
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
}
