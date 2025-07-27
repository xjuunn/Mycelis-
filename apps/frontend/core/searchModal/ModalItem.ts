
export type ModalItemIcon = {
    type: 'icon'
    name: string
}

export type ModalItemImg = {
    type: 'image'
    url: string
}

export interface IModalItem {
    imgOrIcon: ModalItemIcon | ModalItemImg;
    type: 'search' | 'command';
    text: string;
    description: string;
    extra: any;
    onClick: () => void;
}

export class ModalSearchItem implements IModalItem {
    imgOrIcon: ModalItemIcon | ModalItemImg
    type: "search" | "command"
    text: string
    description: string
    extra: any;
    onClick: () => void

    constructor(text: string, onClick: () => void, imgOrIcon: ModalItemIcon | ModalItemImg, description: string) {
        this.type = 'search';
        this.text = text;
        this.imgOrIcon = imgOrIcon;
        this.onClick = onClick;
        this.description = description;
        this.extra = {};
    }


}
