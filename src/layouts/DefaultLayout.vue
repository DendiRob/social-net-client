<template>
    <div class="defaultLayout">
        <TabBar />
        <div class="sidebar">
            <router-view name="sidebar"></router-view>
        </div>        
        <main>
            <router-view ></router-view>
        </main>
    </div>
</template>
<script setup>
import TabBar from '../components/TabBar.vue';


</script>
<style scoped lang="scss">
    .defaultLayout {
        display: flex;
    }
    .sidebar {
        max-width: 360px;
        width: 100%;
        background-color: #FFF;
        height: 100vh;
        border-right: 1px solid #F2F3F5;
        box-sizing: border-box;
        padding-top: 10px;
    }
    .main {
        width: 100%;
        height: 100vh;
        background-color: black;
    }
</style>