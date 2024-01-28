<template>
  <router-link
    v-for="menu in menuItems"
    :key="menu.label"
    :to="menu.url"
    class="sidebarNav__nav_item"
  >
    <div class="sidebarNav__wrapper">
      <svg-icon :name="menu.icon" class="sidebarNav__icon" />
      <div class="sidebarNav__label">{{ menu.label }}</div>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import type { IMenuItems } from './SidebarNav.types.js';
defineProps<{ menuItems: IMenuItems }>();
</script>
<style scoped lang="scss">
.sidebarNav {
  &__wrapper {
    box-sizing: border-box;
    display: flex;
    padding: 12px 16px;
    align-items: center;
  }
  &__icon {
    margin-right: 16px;
    fill: #71747a;
  }
  &__label {
    color: #171a1f;
    font-size: 15px;
    font-weight: 400;
  }
  &__nav {
    &_item {
      text-decoration: none;
      &:hover {
        .sidebarNav {
          &__wrapper {
            background-color: #398fe5;
            transition-duration: 300ms;
          }
          &__label {
            color: #ffffff;
          }
          &__icon {
            fill: #ffffff;
          }
        }
      }
    }
  }
}
.router-link-exact-active {
  .sidebarNav {
    &__wrapper {
      background-color: #398fe5;
      transition-duration: 300ms;
    }
    &__label {
      color: #ffffff;
    }
    &__icon {
      fill: #ffffff;
    }
  }
}
</style>
