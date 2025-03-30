<template>
    <div class="h-full overflow-y-scroll">
        <div class="flex gap-1 p-3 hover:bg-base-200 border border-base-content/0 hover:border-base-content/10 rounded-lg">
            <div class="avatar border w-10 h-10 rounded-full overflow-hidden">
                <img src="https://pbs.twimg.com/profile_images/1770095002783535104/QNTnQj0B_400x400.jpg" alt="avatar">
            </div>
            <div class="flex-1 min-w-0">
                <div class="line-clamp-1 font-bold">
                    <div class="status status-accent ml-1"></div>
                    Junhsiun <span class="text-sm opacity-50">(xjuun)</span> 
                </div>
                <div class="flex gap-1 ml-1">
                    <div class="flex-1 place-self-end text-xs opacity-60">来源：账号搜索</div>
                    <button class="btn btn-primary btn-xs">允许</button>
                    <button class="btn btn-error btn-xs">拒绝</button>
                </div>
            </div>
        </div>
    </div>
</template>