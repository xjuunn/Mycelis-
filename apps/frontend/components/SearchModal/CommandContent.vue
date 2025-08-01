<template>
    <div>
        <div v-if="!isCommandNameInputOver" v-for="(item, index) in listData"
            class="flex text-sm gap-2 p-2 m-1 rounded-md hover:border-base-content/10 hover:bg-base-100/30 border border-base-content/0"
            :class="{
                'bg-base-100 border-base-content/30 hover:bg-base-content/10 hover:border-base-content/30': index == selectIndex
            }">
            <div>{{ item.name }}</div>
            <div class="text-base-content/60">{{ item.description }}</div>
        </div>
        <div v-else class="text-sm">
            <span class="text-base-content/70 ml-2">格式: {{ command?.usage }}</span>
            <div v-for="(item, index) in optionList"
                class="text-base-content/70 p-2 m-1 border border-transparent hover:border-base-content/10 hover:bg-base-100/30 rounded-lg flex gap-2 items-center"
                :class="{
                    'bg-base-100 border-base-content/30 hover:bg-base-content/10 hover:border-base-content/30': index == selectIndex
                }">
                <component :is="item.prefixUI"></component>
                <span>{{ item.title }}</span>
                <span class="flex-1">{{ item.description }}</span>
                <component :is="item.suffixUI"></component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ChoicesResult } from '~/core/searchModal/command/Args';
import { CommandInputHelper } from '~/core/searchModal/command/CommandInputHelper';
import type { BaseCommand } from '~/core/searchModal/command/Commands';

const commandInputHelper = new CommandInputHelper();
const command = ref<BaseCommand | null>(null);
const errorMsg = ref('');
const isCommandNameInputOver = ref(false);
type ListItem = {
    name: string;
    description: string;
}
const listData = ref<ListItem[]>([]);
const optionList = ref<ChoicesResult[]>([])
const selectIndex = ref(-1);
watch(() => useSearchModal().text.value, async (newText) => {
    selectIndex.value = -1;
    errorMsg.value = '';
    const result = await commandInputHelper.setInputCommand(newText)
    if (typeof result === 'string') errorMsg.value = result;
    command.value = commandInputHelper.currentCommand;
    listData.value = commandInputHelper.searchCommand();
    isCommandNameInputOver.value = commandInputHelper.isCommandNameInputOver;
    const optionResult = await commandInputHelper.getLastArgChoices()
    if (optionResult) {
        optionList.value = optionResult
    }
}, { immediate: true });
onMounted(() => {
    onKeyStroke('Tab', (e) => {
        e.preventDefault()
        if (!isCommandNameInputOver.value) {
            inputSelectCommandName();
        } else {
            inputSelectArg();
        }
    })
    onKeyStroke('ArrowUp', (e) => {
        e.preventDefault()
        if (selectIndex.value > 0)
            selectIndex.value--;

    })
    onKeyStroke('ArrowDown', (e) => {
        e.preventDefault()
        selectNext();
    })
    onKeyStroke('Enter', async (e) => {
        e.preventDefault()
        const result = await command.value?.execute();
        console.log(result);


    })
})
function selectNext() {
    if (!isCommandNameInputOver.value) {
        if (selectIndex.value < listData.value.length - 1)
            selectIndex.value++;
    } else {
        if (selectIndex.value < optionList.value.length - 1)
            selectIndex.value++;
        else selectIndex.value = 0;
    }
}
function inputSelectCommandName() {
    const cmd = listData.value[selectIndex.value];
    if (cmd) useSearchModal().setText('/' + cmd.name + ' ')
}

function inputSelectArg() {
    const option = optionList.value[selectIndex.value];
    if (option === undefined) return;
    const inputText = useSearchModal().text.value;
    const inputarr = inputText.split(' ').slice(0, -1)
    inputarr.push(option.title.trim())
    useSearchModal().setText(inputarr.join(' ') + ' ')

}
</script>