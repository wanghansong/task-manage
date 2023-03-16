<!-- 左侧菜单 -->
<template>
    <div class="sidebar-container">
        <div style="-webkit-app-region: drag" class="h-40px w-full"></div>
        <div class="flex items-center cursor-pointer header">
            <el-avatar :size="40" src="">
                <img
                    src="~@renderer/assets/empty/default-avatar.png"
                />
            </el-avatar>
            <span class="ml-8px flex-1 truncate" :title="userInfo.nameZh">{{ userInfo.nameZh }}</span>
        </div>
        <div class="menu-container">
            <el-menu :default-active="menuList[0].path" router>
                <template v-for="menuItem in menuList" :key="menuItem.path">
                    <el-menu-item :index="menuItem.path">
                        <i :class="['mr-8px', 'text-20px', 'iconfont', menuItem.icon]"></i>
                        <span class="menu-title">{{ menuItem.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { menuList } from '../data'

const userInfo = ref({
    nameZh: 'wanghansongwanghansongwanghansongwanghansong'
})

</script>
<style scoped lang="scss">
.sidebar-container {
    .header {
        padding: 0 20px 20px 20px;
    }
    .menu-container {
        :deep(.el-menu) {
            border-right: none;
            .el-menu-item {
                &.is-active {
                    background-color: var(--el-color-primary-light-9);
                }
                &:not(.is-active) {
                    color: var(--el-text-color-regular);
                }
                .menu-title {
                    font-weight: 500;
                }
            }
        }
    }
}
</style>