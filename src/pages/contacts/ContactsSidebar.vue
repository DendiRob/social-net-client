<template>
    <div class="contactsSidebar">
        <h1 class="contacts__title">Contacts</h1>
        <InputSearch />
    </div>
</template>
<script setup>
import InputSearch from '../../components/InputSearch.vue';


</script>
<style scoped lang="scss">
    .contacts {
        &__title {
            color: #171A1F;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            margin: 0;
            margin-left: 16px;
        }
    }
    
</style>