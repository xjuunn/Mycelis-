<template>
    <div class="overflow-scroll">
        贡献热力图

        <table>
            <tr v-for="tr in 7">
                <td v-for="td in (option.days / 7) + 1">
                    <div v-show="heatMapList[7 * (td - 1) + tr]?.date !== undefined"
                        class="w-[11px] h-[11px] m-[2px] rounded-[3px] bg-success ">
                        <!-- {{ heatMapList[7 * (td - 1) + tr]?.count }} -->
                        <!-- {{ 7 * (td - 1) + tr }} -->
                    </div>

                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
const option = ref({
    days: 22 * 7
})
type HeatMapItem = {
    date: string,
    week: number,
    count: 0,
    level: 0 | 1 | 2 | 3,
}
const heatMapList = ref<HeatMapItem[]>([]);
onMounted(() => {
    initHeatMap();
})
function initHeatMap() {
    let firstDayInfo = getFirstDay();
    let firstDay = firstDayInfo.date;
    let today = new Date();
    for (let i = 0; i < option.value.days + firstDayInfo.offset; i++) {
        const thisday = new Date(firstDay + i * 1000 * 60 * 60 * 24);
        heatMapList.value.push({
            count: 0,
            level: 0,
            date: thisday.toLocaleDateString(),
            week: thisday.getDay() == 0 ? 7 : thisday.getDay()
        })
        if (thisday.toLocaleDateString() === today.toLocaleDateString()) break;
    }
}

function getFirstDay() {
    const today = Date.now();
    // 计算 {option.days} 天前的日期
    const targetDate = today - 1000 * 60 * 60 * 24 * option.value.days;
    // 计算目标周的周一
    const firstDate = targetDate - (new Date(targetDate).getDay() - 1) * 1000 * 60 * 60 * 24;
    return {
        date: firstDate,
        offset: new Date(targetDate).getDay()
    };
}


</script>