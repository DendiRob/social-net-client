<template>
  <router-link
    v-for="menu in menuItems"
    :key="menu.label"
    :to="{ name: menu.routeName }"
    class="sidebarNav__nav_item"
  >
    <SidebarNavItem
      class="sidebarNavItem"
      :icon-name="menu.icon"
      :item-label="menu.label"
    />
  </router-link>
</template>
<script setup lang="ts">
import SidebarNavItem from '../sidebarNavItem';
import type { IMenuItems } from './SidebarNav.types.js';
defineProps<{ menuItems: IMenuItems }>();
</script>
<style scoped lang="scss">
.sidebarNav {
  &__nav {
    &_item {
      text-decoration: none;
    }
  }
}
.router-link-exact-active {
  &:deep(.sidebarNavItem) {
    background-color: #398fe5;
    transition-duration: 300ms;
    .item__label,
    .item__icon {
      color: #ffffff;
    }
  }
}
</style>
