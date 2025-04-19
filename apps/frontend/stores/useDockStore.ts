export const useDockStore = defineStore('dock', () => {
    let _dockItemList: Ref<DockItem[]> = ref([{
        id: 'd1',
        name: '消息',
        sort: 1,
        icon: 'solar:chat-square-bold-duotone',
        activeIcon: 'solar:chat-square-bold-duotone',
        page: '/'
    }, {
        id: 'd2',
        name: '通讯录',
        sort: 2,
        icon: 'solar:book-bold-duotone',
        activeIcon: 'solar:book-bold-duotone',
        page: '/contacts'
    }, {
        id: 'd3',
        name: '通知',
        sort: 3,
        icon: 'solar:notification-unread-bold-duotone',
        activeIcon: 'solar:notification-unread-bold-duotone',
        page: '/notification'
    }, {
        id: 'd4',
        name: '我的',
        sort: 4,
        icon: 'solar:user-rounded-bold-duotone',
        activeIcon: 'solar:user-rounded-bold-duotone',
        page: '/persion'
    }]);
    let _activeDockId = ref('');
    let _activeDockIndex = ref(0);
    let _onAddEvents: Function[] = [];
    let _onRemoveEvents: Function[] = [];
    let dockItemList = computed(() => _dockItemList.value)
    let activeDockId = computed(() => {
        if (_activeDockId.value === '' && _dockItemList.value.length) _activeDockId.value = dockItemList.value[0].id;
        return _activeDockId.value
    });
    let activeDockIndex = computed(() => _activeDockIndex.value)
    function addDockItem(name: string, page: string, icon: string, activeIcon?: string, sort: number = 100, callevent: boolean = true) {
        if (!activeIcon) activeIcon = icon;
        _dockItemList.value.push({
            id: Math.random() + '', name, sort, icon, activeIcon, page
        })
        _dockItemList.value.sort((a, b) => a.sort - b.sort)
        if (callevent) _onAddEvents.forEach(e => e());
    }
    function removeDockItem(id: string, callEvent: boolean = true) {
        _dockItemList.value.filter(item => item.id !== id);
        if (callEvent) _onRemoveEvents.forEach(e => e());
    }
    function setActiveDockId(id: string) {
        _activeDockId.value = id;
        _dockItemList.value.forEach((item, index) => {
            if (item.id === id) {
                _activeDockIndex.value = index;
                return;
            }
        });
    }

    function addEvent(type: 'ADD' | 'REMOVE', callback: Function) {
        if (type === 'ADD') _onAddEvents.push(callback);
        else if (type === 'REMOVE') _onRemoveEvents.push(callback);
    }

    return {
        dockItemList, addDockItem, removeDockItem,
        activeDockId, setActiveDockId, addEvent, activeDockIndex
    }
})

interface DockItem {
    id: string;
    name: string;
    sort: number;
    icon: string;
    activeIcon?: string;
    page: string;
}