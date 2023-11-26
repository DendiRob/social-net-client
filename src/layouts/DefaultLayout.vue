<template>
    <div class="defaultLayout">
        <div class="tabbar"></div>
        <div class="sidebar">
            <router-view name="sidebar"></router-view>
        </div>        
        <main>
            <router-view ></router-view>
        </main>
    </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
    .defaultLayout {
        display: flex;
    }
    .sidebar {
        max-width: 360px;
        width: 100%;
        background-color: red;
        height: 100vh;
    }
    .main {
        width: 100%;
        height: 100vh;
        background-color: black;
    }
    .tabbar {
        width: 65px;
        background-color: yellow;
        height: 100vh;
      }
</style>