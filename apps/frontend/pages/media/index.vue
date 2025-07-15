<template>
    <div class="relative w-full h-screen">
        <div class="h-full w-full">
            <MediaList></MediaList>
        </div>
        <div class="w-full absolute bottom-2 flex justify-center gap-1">
            <ul class="menu bg-base-200 border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a>
                        <Icon name="mingcute:mic-fill" size="1.1rem"></Icon>
                    </a>
                </li>
                <li>
                    <a>
                        <Icon name="mingcute:camcorder-fill" size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
            <ul class="menu bg-base-200 border-base-content/10 border menu-horizontal rounded-box">
                <li>
                    <a>
                        <Icon name="mingcute:computer-fill" size="1.1rem"></Icon>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>