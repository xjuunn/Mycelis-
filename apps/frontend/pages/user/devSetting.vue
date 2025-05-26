<template>
    <div>
        <div class="h-24 p-4 sticky top-0 z-40 bg-base-300">
            <div class="absolute bottom-3 text-lg font-bold">
                <button class="btn btn-ghost btn-square mr-2 sm:hidden" @click="goBack">
                    <Icon name="mingcute:left-line" size="1.6rem"></Icon>
                </button>
                <span>开发者设置</span>
            </div>
            <div class="absolute bottom-5 sm:bottom-3 right-3">

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
function goBack() {
    useRouter().back();
}
</script>
