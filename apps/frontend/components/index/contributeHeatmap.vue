<template>
    <div class="w-full overflow-scroll">
        贡献热力图
        <table v-show="!isloading">
            <tr v-for="tr in 7">
                <td v-for="td in (option.days / 7) + 1">
                    <div ref="block" v-show="heatMapList[7 * (td - 1) + tr]?.date !== undefined"
                        class="w-[11px] h-[11px] m-[2px] rounded-[3px] bg-success" :class="{
                            'opacity-5': heatMapList[7 * (td - 1) + tr]?.level === 0,
                            'opacity-30': heatMapList[7 * (td - 1) + tr]?.level === 1,
                            'opacity-70': heatMapList[7 * (td - 1) + tr]?.level === 2,
                            'opacity-100': heatMapList[7 * (td - 1) + tr]?.level === 3,
                        }">
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { animate, stagger } from 'animejs';
import * as APP from '~/api/app';
const option = ref({
    days: 22 * 7
})
type HeatMapItem = {
    date: string,
    week: number,
    count: number,
    level: 0 | 1 | 2 | 3 | 4,
}
const blocks = useTemplateRef('block')
const heatMapList = ref<HeatMapItem[]>([]);
const isloading = ref(true);
onMounted(() => {
    initHeatMap();
    initData();

})
async function initData() {
    isloading.value = true;
    const { data } = await APP.Info.contributeHeatmap({ start: new Date(getFirstDay().date).toLocaleDateString() });
    const map = new Map<string, number>();
    data.data.forEach(date => {
        map.set(new Date(date.date).toLocaleDateString(), date.count);
    })
    let max = 0;
    heatMapList.value.forEach(date => {
        date.count = map.get(date.date) ?? 0;
        if (date.count > max) max = date.count
    })
    let unit = max / 4;
    heatMapList.value.forEach(date => {
        if (date.count === 0) {
            date.level = 0;
            return;
        }
        if (date.count <= unit) {
            date.level = 1;
            return;
        }
        if (date.count <= 2 * unit) {
            date.level = 2;
            return;
        }
        if (date.count <= 3 * unit) {
            date.level = 3;
            return;
        }
        date.level = 4;
    })
    isloading.value = false;
    startAnimate();
}

function startAnimate() {
    if (blocks.value)
        animate(blocks.value, {
            scale: [
                { to: [0, 1.25] },
                { to: 1 }
            ],
            boxShadow: [
                { to: '0 0 1rem 0 currentColor' },
                { to: '0 0 0rem 0 currentColor' }
            ],
            x: [
                { to: '5px' },
                { to: 0 }
            ],
            delay: stagger(100, {
                grid: [blocks.value.length / 7, 7],
                from: Math.random() * blocks.value.length
            }),
        });
}

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