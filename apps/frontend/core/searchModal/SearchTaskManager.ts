import { SearchUserHandler, type IModalHandlerResult, type ISearchHandler, type SearchHandlerResult } from "./ModalHandler";

export class SearchTaskManager {
    private static instance: SearchTaskManager;
    private tasks: Map<string, ISearchHandler>;

    private constructor() {
        this.tasks = new Map<string, ISearchHandler>();
    }

    public static getInstance(): SearchTaskManager {
        if (!SearchTaskManager.instance) {
            SearchTaskManager.instance = new SearchTaskManager();
        }
        return SearchTaskManager.instance;
    }

    // 注册搜索处理器
    public registerHandler(handler: ISearchHandler): void {
        this.tasks.set(handler.groupName, handler);
    }

    // 获取搜索处理器
    public getHandler(groupName: string): ISearchHandler | undefined {
        return this.tasks.get(groupName);
    }

    // 执行搜索任务
    public async executeSearch(keyword: string, getData: (data: SearchHandlerResult) => void) {
        this.tasks.forEach(async (handler) => {
            const data = await handler.doSearch(keyword, 0, 3);
            getData(data);
        });
    }
}