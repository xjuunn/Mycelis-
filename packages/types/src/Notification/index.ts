export class AppNotification<T = any> {
    id: string;
    origin: AppNotificationOrigin;
    content: string;
    icon: string;
    level: AppNotificationLevel;
    timestamp: string;
    data: T;
    constructor(id: string, origin: AppNotificationOrigin, content: string, icon: string, level: AppNotificationLevel, timestamp: string, data: T) {
        this.id = id;
        this.origin = origin;
        this.content = content;
        this.icon = icon;
        this.level = level;
        this.timestamp = timestamp;
        this.data = data;
    }
}

export enum AppNotificationLevel {
    'tip', 'normal', 'important'
}

export enum AppNotificationOrigin {
    '系统', '好友申请'
}