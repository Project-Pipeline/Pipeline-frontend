export class MessagingConnect {
    constructor(
        public conversationID: string,
        public originatingUserID: string
    ) {
    }
}

export class MessagingConnectionEstablished {
    connectionEstablished: boolean;
}
