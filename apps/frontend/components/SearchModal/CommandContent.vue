<template>
    <div>
        <div v-if="!isCommandNameInputOver" v-for="item in listData"
            class="flex text-sm gap-2 p-2 m-1 rounded-md hover:border-base-content/10 hover:bg-base-100/30 border border-base-content/0">
            <div>{{ item.name }}</div>
            <div class="text-base-content/60">{{ item.description }}</div>
        </div>
        <div v-else class="text-sm">
            <span class="text-base-content/70 ml-2">格式: {{ command?.usage }}</span>
            <div v-for="item in optionList"
                class="text-base-content/70 p-2 m-1 border border-transparent hover:border-base-content/10 hover:bg-base-100/30 rounded-lg flex gap-1 items-center">
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
watch(() => useSearchModal().text.value, async (newText) => {
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

</script>