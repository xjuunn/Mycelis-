export const useDockStore = defineStore('dock', () => {
    let _dockItemList: Ref<DockItem[]> = ref([]);
    let _activeDockId = ref('');
    let _onAddEvents: Function[] = [];
    let _onRemoveEvents: Function[] = [];
    let dockItemList = computed(() => _dockItemList.value)
    let activeDockId = computed(() => {
        if (_activeDockId.value === '' && _dockItemList.value.length) _activeDockId.value = dockItemList.value[0].id;
        return _activeDockId.value
    });

    onMounted(() => {
        addDockItem('消息', '/', 'solar:chat-square-bold-duotone', 'solar:chat-square-bold-duotone', 1, false)
        addDockItem('功能​', '/function', 'solar:box-minimalistic-bold-duotone', 'solar:box-minimalistic-bold-duotone', 2, false)
        addDockItem('通知', '/notification', 'solar:notification-unread-bold-duotone', 'solar:notification-unread-bold-duotone', 3, false)
        addDockItem('我的', '/persion', 'solar:user-rounded-bold-duotone', 'solar:user-rounded-bold-duotone', 4, false)
    })

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
    }

    function addEvent(type: 'ADD' | 'REMOVE', callback: Function) {
        if (type === 'ADD') _onAddEvents.push(callback);
        else if (type === 'REMOVE') _onRemoveEvents.push(callback);
    }

    return {
        dockItemList, addDockItem, removeDockItem,
        activeDockId, setActiveDockId, addEvent
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