// Type definitions for facebook-chat-api 1.5.0
// Project: messenger-tag-scrapper
// Definitions by: Simon Galet <simon.galet@gmail.com>

/* tslint:disable */

declare namespace FacebookChatApi {

    type InputID = string | number;
    type OutputID = string;

    interface ICredentials {
        email: string;
        password: string;
    }

    interface IAppStateCredentials {
        appState: any;
    }

    type LogLevel = "silly" | "verbose" | "info" | "http" | "warn" | "error" | "silent";

    interface IOptions {
        logLevel?: LogLevel;

        selfListen?: boolean;
        listenEvents?: boolean;
        updatePresence?: boolean;

        forceLogin?: boolean;

        pageID?: InputID;
    }

    interface IError {
        error: string;
    }

    interface IMessage {
        body: string;
    }

    interface IStickerMessage extends IMessage {
        sticker: string;
    }

    interface IAttachmentMessage extends IMessage {
        attachment: ReadableStream | ReadableStream[];
    }

    interface IUrlMessage extends IMessage {
        url: string;
    }

    type EmojiSize = "small" | "medium" | "large";

    interface IEmojiMessage extends IMessage {
        emoji: string;
        emojiSize: EmojiSize;
    }

    interface IMentionsMessage extends IMessage {
        mentions: IMention[];
    }

    interface IMention {
        id: string;
        tag: string;
        fromIndex?: number;
    }

    interface IMessageInfo {
        threadID: OutputID;
        messageID: OutputID;

        timestamp: number;
    }

    interface Nickname {
        userId: OutputID;
        nickname: string
    }

    type Gender = "MALE" | "FEMALE" | "NEUTER" | "UNKNOWN";

    type Folder = "INBOX" | "ARCHIVED" | "PENDING " | "OTHER" | "unread";

    type AccountType = "User" | "Page" | "UnavailableMessagingActor" | "ReducedMessagingActor";

    interface Participant {
        accountType: AccountType
        userId: OutputID;
        name: string;
        url: string | null;
        profilePicture: string;
        username: string | null;
        isMessageBlockedByViewer: boolean;
    }

    interface User extends Participant {
        shortName: string;
        gender: Gender;
        url: string;
        isViewerFriend: boolean;
        isMessengerUser: boolean;
        isVerified: boolean;
        isViewerCoworker: boolean;
    }

    interface Page extends Participant {
        url: string;
        acceptsMessengerUserFeedback: boolean;
        isMessengerUser: boolean;
        isVerified: boolean;
        isMessengerPlatformBot: boolean;
    }

    interface ReducedMessagingActor extends Participant {
        url: null;
        acceptsMessengerUserFeedback: boolean;
    }

    interface UnavailableMessagingActor extends Participant {
        url: null;
        username: null;
        acceptsMessengerUserFeedback: boolean;
    }

    interface IThreadInfo {
        threadID: OutputID;
        name: string;
        unreadCount: number;
        messageCount: number;
        imageSrc?: string;
        emoji?: string;
        color?: string;
        nicknames?: Array<Nickname>;
        muteUntil?: number;
        participants: Array<User | Page | ReducedMessagingActor | UnavailableMessagingActor>;
        adminIds: Array<OutputID>;
        folder: Folder;
        isGroup: boolean;
        customizationEnabled: boolean;
        participantAddMode?: "ADD";
        reactionsMuteMode: "REACTIONS_NOT_MUTED" | "REACTIONS_MUTED";
        mentionsMuteMode: "MENTIONS_NOT_MUTED" | "MENTIONS_MUTED";
        isArchived: boolean;
        isSubscribed: boolean;
        timestamp: number;
        snippet: string;
        snippetAttachments: Array<IAttachment>;
        snippedSender: OutputID;
        lastMessageTimestamp: number;
        lastReadTimestamp?: number;
        cannotReplyReason?: "RECIPIENTS_NOT_LOADABLE" | "BLOCKED";
    }

    type AttachmentType = "sticker" | "file" | "photo" | "animated_image" | "share" | "video";

    interface IAttachment {
        type: AttachmentType;
    }

    interface IStickerAttachment extends IAttachment {
        type: "sticker";
        url: string;
        stickerID: OutputID;
        packID: OutputID;
        frameCount: number;
        frameRate: number;
        framesPerRow: number;
        framesPerCol: number;
        spriteURI: string;
        spriteURI2x: string;
        height: number;
        width: number;
        caption?: string;
        description?: string;
    }

    interface IFileAttachment extends IAttachment {
        type: "file";
        name: string;
        url: string;
        ID: OutputID;
        fileSize: string;
        isMalicious: boolean;
        mimeType: string;
    }

    interface IPhotoAttachment extends IAttachment {
        /** photo */
        type: "photo";
        ID: OutputID;
        filename: string;
        thumbnailUrl: string;
        previewUrl: string;
        previewWidth: number;
        previewHeight: number;
        largePreviewUrl: string;
        largePreviewWidth: number;
        largePreviewHeight: number;
        url?: string;
        width: number;
        height: number;
    }

    interface IAnimatedImageAttachment extends IAttachment {
        type: "animated_image";
        name: string;
        facebookUrl: string;
        previewUrl: string;
        previewWidth: number;
        previewHeight: number;
        thumbnailUrl: string;
        ID: OutputID | "";
        filename?: string;
        mimeType?: string;
        width?: number;
        height?: number;
        url?: string;
        rawGifImage?: any;
        rawWebpImage?: any;
        animatedGifUrl?: string;
        animatedGifPreviewUrl?: string;
        animatedWebpUrl?: string;
        animatedWebpPreviewUrl?: string;
    }

    interface IVideoAttachment extends IAttachment {
        type: "video";
        filename: string;
        thumbnailUrl: string;
        previewUrl: string;
        previewWidth: number;
        previewHeight: number;
        ID: OutputID;
        url: string;
        width: number;
        height: number;
        duration: number;
    }

    interface IShareAttachment extends IAttachment {
        type: "share";
        description: string;
        ID: OutputID;
        animatedImageSize: {
            height: number,
            width: number,
        };
        width: number;
        height: number;
        image: string;
        playable: boolean;
        duration: number;
        source: string;
        title: string;
        facebookUrl: string;
        target: any;
        styleList: string[];
        url?: string;
        subattachments: IShareSubAttachment[];
    }

    interface IShareSubAttachment {
        description: string;
        media: {
            animated_image: string,
            animated_image_size: { height: number, width: number },
            image: string,
            image_size: { height: number, width: number },
            duration: number,
            playable: boolean,
            source: string,
        };
        source: string;
        style_list: string[];
        title: string;
        properties: any;
        uri: string;
        forwadable: boolean;
        subattachments: IShareSubAttachment[];
        deduplication_key: string;
        action_links: string[];
        messaging_attribution: {
            attribution_type: string,
            attribution_id: string,
            name: string,
            icon_url: string,
        };
        messenger_ctas: string[];
        target: {
            video_id: string;
        } | any;
    }

    export interface IThreadHistoryMessage {
        type: "message";
        senderName: string;
        senderID: OutputID;
        participantNames: string[];
        participantIDs: string[];
        body: string;
        threadID: string;
        threadName: string;
        location: any;
        messageID: OutputID;
        attachments: IAttachment[];
        timestamp: number;
        timestampAbsolute?: number;
        timestampRelative?: number;
        timestampDatetime?: number;
        tags: string[];
        reactions: IDictionary<string>;
        isGroup: boolean;
    }

    interface IDictionary<TValue> {
        [key: string]: TValue;
    }

    class Api {
        /**
         * Returns current appState which can be saved to a file or stored in a variable.
         */
        public getAppState(): any;

        /**
         * Get `amount` of messages from `threadID` starting from messages posted at `timestamp`
         * If you're getting a 500 error, it's possible that you're requesting too many messages.
         * Try reducing that number and see if that works.
         *
         * @param threadID - A threadID corresponding to the target chat
         * @param amount - The amount of messages to request.
         * @param timestamp - Used to described the time of the most recent message to load. If timestamp is `undefined`, facebook will load the most recent messages.
         * @param callback -If error is null, history will contain an array of message objects.
         */
        public getThreadHistory(threadID: string, amount: number, timestamp: number | undefined, callback: (err: IError, history: IThreadHistoryMessage[]) => void): void;

        /**
         * returns information about threads
         * @param limit - Limit the number of threads to fetch.
         * @param timestamp - Request threads before this date. null means now
         * @param tags - An array describing which folder to fetch. It should be one of these:
         *      - ["INBOX"] (same as [])
         *      - ["ARCHIVED"]
         *      - ["PENDING"]
         *      - ["OTHER"]
         *      - ["INBOX", "unread"]
         *      - ["ARCHIVED", "unread"]
         *      - ["PENDING", "unread"]
         *      - ["OTHER", "unread"]
         * @param callback - Callback called when the query is done (either with an error or with a proper result)
         */
        public getThreadList(limit: number, timestamp: number | null, tags: Array<Folder>, callback: (err: IError, list: Array<IThreadInfo>) => void): void;

        /**
         * Logs out the current user.
         *
         * @param callback - A callback called when the query is done (either with an error or with null).
         */
        public logout(callback?: (err: IError) => void): void;

        /**
         * Sends the given message to the `threadID`.
         *
         * @param message - A string (for backward compatibility) or a message object.
         * @param threadID - A string, number, or array representing a thread.It happens to be someone's userID in the case of a one to one conversation or an array of userIDs when starting a new group chat.
         * @param callback - A callback called when sending the message is done (either with an error or with an confirmation object). `messageInfo` contains the `threadID` where the message was sent and a `messageID`, as well as the `timestamp` of the message.
         */
        public sendMessage(message: string | IMessage, threadID: InputID | InputID[],
                           callback?: (err: IError, messageInfo: IMessageInfo) => void): void;
    }
}

declare module "facebook-chat-api" {
    /**
     * Allows the user to log into facebook given the right credentials.
     * If it succeeds, `callback` will be called with a `null` object (for potential errors) and with an `api` object containing all the available functions.
     * If it fails, `callback` will be called with an error object.
     *
     * @param credentials - An object containing the fields `email` and `password` used to login, __*or*__ an object containing the field `appState`.
     * @param options - An object representing options to use when logging in.
     * @param callback - A callback called when login is done (successful or not). `err` is an object containing a field `error`.
     */
    function login(credentials: FacebookChatApi.ICredentials | FacebookChatApi.IAppStateCredentials,
                   options: FacebookChatApi.IOptions,
                   callback: (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => void): void;

    /**
     * Allows the user to log into facebook given the right credentials.
     * If it succeeds, `callback` will be called with a `null` object (for potential errors) and with an `api` object containing all the available functions.
     * If it fails, `callback` will be called with an error object.
     *
     * @param credentials - An object containing the fields `email` and `password` used to login, __*or*__ an object containing the field `appState`.
     * @param callback - A callback called when login is done (successful or not). `err` is an object containing a field `error`.
     */
    function login(credentials: FacebookChatApi.ICredentials | FacebookChatApi.IAppStateCredentials,
                   callback: (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => void): void;

    export = login;
}
