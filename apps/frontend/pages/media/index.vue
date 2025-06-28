<template>
    <div class="flex flex-col h-screen border">
        <div class="flex-1 border m-3 rounded-lg">1</div>
        <div>
            <UtilShowOnDevice :show-on="['isAndroid']">
                <template v-slot="{ isTauri }">
                    {{ isTauri }}
                </template>
            </UtilShowOnDevice>
        </div>
    </div>
</template>