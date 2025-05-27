// packages/types/src/enums.ts

export enum DeviceType {
    Browser = 'Browser',
    Android = 'Android',
    IOS = 'IOS',
    MacOS = 'MacOS',
    Linux = 'Linux',
    Windows = 'Windows',
    Unknow = 'Unknow'
}

export enum UserStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum FriendRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED'
}

export enum MessageStatus {
    Sent = 'Sent',
    Delivered = 'Delivered',
    Read = 'Read',
    Deleted = 'Deleted',
    Failed = 'Failed',
    Modified = 'Modified'
}

export enum MessageOrigin {
    User = 'User',
    System = 'System'
}

export enum MessageType {
    Text = 'Text',
    Image = 'Image',
    File = 'File'
}