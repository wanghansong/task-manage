<!-- 日程 -->
<template>
    <div class="flex flex-col h-full daily-page">
        <div class="daily-page__header" style="-webkit-app-region: drag">
            <el-tabs v-model="activeTab" tab-position="top">
                <el-tab-pane
                    v-for="name in tabOptions"
                    :key="name"
                    :label="name"
                    :name="name"
                    lazy
                >
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="flex-1 overflow-auto animate__animated animate__fadeIn daily-page__main">
            <DailyTask />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import DailyTask from './tabs/daily-task/index.vue';

const activeTab = ref('日程');
const tabOptions = ['日程', '汇总'];

</script>
<style scoped lang="scss">
.daily-page {
    &__header {
        background-color: #ffffff;
        width: 100%;
        padding: 16px 16px 0 16px;
        :deep(.el-tabs) {
            width: 140px;
            .el-tabs__header {
                margin: 0;
            }
            .el-tabs__nav-wrap::after {
                display: none;
            }
            .el-tabs__item {
                font-size: 16px;
            }
        }
    }
    &__main {
        padding: 20px;
    }
}
</style>
