<template>
    <div class="w-full bg-gradient-to-br from-base-100 to-base-200 rounded-box p-6">
        <div class="flex flex-col items-center text-center">
            <div class="relative mb-4">
                <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center 
                    animate-float">
                    <Icon name="mingcute:message-1-line" class="text-primary" size="2rem"></Icon>
                </div>
                <div class="absolute -inset-2 bg-primary/5 rounded-full animate-ping-slow 
                    opacity-0"></div>
            </div>

            <h2 class="text-2xl font-bold mb-2 text-primary-content">
                Hi, {{ useAppStore().user?.displayName ?? useAppStore().user?.name }}!
            </h2>
            <p class="text-gray-500 mb-4 max-w-md">
                {{ currentGreeting }}
            </p>

            <div class="flex gap-3 mt-2">
                <button class="btn btn-primary btn-sm">
                    开始新对话
                </button>
                <a href="#commitList" class="btn btn-ghost btn-sm">
                    更新记录
                </a>
            </div>
        </div>

        <div class="divider my-4 opacity-50">OR</div>

        <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition">
                <kbd class="kbd kbd-xs">⌘</kbd> + <kbd class="kbd kbd-xs">K</kbd>
                <span>快速搜索</span>
            </div>
            <div class="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg transition">
                <kbd class="kbd kbd-xs">/</kbd>
                <span>命令菜单</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 问候语库（按时间段分类）
const greetings = {
    morning: [
        '新的一天开始了，随时为您保持连接 📱',
        '清晨好！今天有什么计划？',
        '早安，愿您今天高效又顺心 ✨',
        '☕ 咖啡已备好，就等您上线啦~',
        '您今日的「精神电量」：███ 100%（请保持）'
    ],
    afternoon: [
        '下午好，来聊聊今天的新鲜事吧~',
        '午后时光，适合深度交流 ☀️',
        '下午茶时间到，休息一下吧 🍵',
        "饭后不宜运动，宜躺着打字"
    ],
    evening: [
        '夜晚是深度交流的好时光',
        '华灯初上，放松一下如何？🌃',
        '夜深了，记得适当休息哦 🌙',
        '夜猫子模式已自动激活 🐱‍👤',
        "警告：连续聊天可能导致嘴角上扬酸痛"
    ]
}

const currentGreeting = ref('')

const getRandomGreeting = () => {
    const hour = new Date().getHours()
    let greetingsPool: string[] = []

    if (hour < 12) {
        greetingsPool = greetings.morning
    } else if (hour < 18) {
        greetingsPool = greetings.afternoon
    } else {
        greetingsPool = greetings.evening
    }

    const randomIndex = Math.floor(Math.random() * greetingsPool.length)
    return greetingsPool[randomIndex];
}

onMounted(() => {
    currentGreeting.value = getRandomGreeting()
})


</script>

<style>
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }
}

@keyframes ping-slow {
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    70% {
        transform: scale(1.3);
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-ping-slow {
    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>