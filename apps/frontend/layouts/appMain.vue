<template>
    <div class="h-screen w-screen flex overflow-hidden">
        <div class="flex flex-col items-center pt-3">
            <button class="btn btn-sm btn-square p-1">
                <img class="opacity-20" src="/icon-light-256.png" alt="logo">
            </button>
            <div class="menu join join-vertical">
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:dialog-2-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:cursor-square-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:compass-square-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:archive-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:magic-stick-3-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:pen-new-square-bold-duotone" size="1.2rem"></Icon>
                </button>
                <button class="btn btn-md btn-square join-item opacity-50 hover:opacity-100 transition">
                    <Icon name="solar:add-circle-bold-duotone" size="1.2rem"></Icon>
                </button>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
