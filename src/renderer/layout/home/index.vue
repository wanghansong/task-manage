<!-- 主页导航 -->
<template>
    <div class="page-layout">
		<div class="page-layout__left">
			<SideBar />
		</div>

		<div class="page-layout__right">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
		</div>
	</div>
   
</template>

<script lang='ts' setup>
import SideBar from './components/side-bar.vue'


</script>
<style scoped lang="scss">
.page-layout {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    &__left {
        width: 220px;
        background: #ffffff;
    }
    &__right {
        flex: 1;
    }
}
</style>