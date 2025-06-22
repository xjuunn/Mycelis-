<template>
    <div>
        <div class="h-24 p-4 sticky top-0 z-40 bg-base-300">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>日志</span>
            </div>
            <div class="absolute bottom-5 sm:bottom-3 right-3">
                <div class="inline-flex items-center">
                    <NuxtLink to="/test" class="text-xs link link-accent me-2">测试入口</NuxtLink>
                    <span class="text-xs">日志记录：</span>
                    <input type="checkbox" :checked="debug" @change="debugToggleChange" class="toggle toggle-primary" />
                </div>
            </div>
        </div>
        <div class="p-4">
            <DevLogList></DevLogList>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { debug } = useLogger();

function debugToggleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    useLogger().setDebug(target.checked);
    if (target.checked) showHello();
}
onMounted(() => {
    showHello();
})

function showHello() {

}


function goBack() { useRouter().back(); }
</script>
