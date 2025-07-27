
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
    onClick: () => void;
}

export class ModalSearchItem implements IModalItem {
    imgOrIcon: ModalItemIcon | ModalItemImg
    type: "search" | "command"
    text: string
    onClick: () => void

    constructor(text: string, onClick: () => void, imgOrIcon: ModalItemIcon | ModalItemImg) {
        this.type = 'search';
        this.text = text;
        this.imgOrIcon = imgOrIcon;
        this.onClick = onClick;
    }


}
