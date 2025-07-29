import { UserStatus } from "@mycelis/types/dist/esm/Enum";
import { ModalSearchItem, type IModalItem } from "./ModalItem";
import * as User from '~/api/user';

export interface IModalHandlerResult {
    groupName: string;
    modalSearchItemList: IModalItem[]
}

export class SearchHandlerResult implements IModalHandlerResult {
    groupName: string;
    modalSearchItemList: ModalSearchItem[]
    constructor(groupName: string) {
        this.groupName = groupName;
        this.modalSearchItemList = [];
    }

    addItem(item: ModalSearchItem) {
        this.modalSearchItemList.push(item);
    }
}

export interface ISearchHandler {
    groupName: string;
    doSearch: (keyword: string, skip: number, take: number) => Promise<SearchHandlerResult>
}

export class SearchUserHandler implements ISearchHandler {
    groupName: string;
    constructor() {
        this.groupName = '用户';
    }
    doSearch = async (keyword: string, skip: number = 0, take: number = 3): Promise<SearchHandlerResult> => {
        const { data } = await User.search(keyword, take, skip);
        const searchHandlerResult = new SearchHandlerResult(this.groupName);
        data.data.list.forEach(user => {
            const item: ModalSearchItem = new ModalSearchItem(user.displayName ?? '', () => {
                navigateTo(`/message/${user.name}?ui=content`);
                useSearchModal().closeModal();
            }, { type: 'image', url: user.avatarUrl ?? '' }, user.name)
            item.extra = {
                status: user.status, ui: user.status === UserStatus.ONLINE ? <div class={''}>
                    <span class={'status status-success'}></span> 在线
                </div> : <span></span>
            }
            searchHandlerResult.addItem(item);
        })
        return searchHandlerResult;
    }

}