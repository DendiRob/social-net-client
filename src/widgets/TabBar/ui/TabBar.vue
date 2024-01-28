<template>
  <div class="tabbar">
    <nav>
      <ul class="tabbar__nav">
        <li>
          <router-link
            :to="{ name: 'home' }"
            exact-active-class="router-link-active"
            class="tabbar__nav_item"
          >
            <SvgIcon name="friends" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'chats' }" class="tabbar__nav_item">
            <SvgIcon name="message" />
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'posts' }" class="tabbar__nav_item">
            <SvgIcon name="postIcon" />
          </router-link>
          <router-link :to="{ name: 'settings' }" class="tabbar__nav_item">
            <SvgIcon name="settings" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { SvgIcon } from 'shared/ui/SvgIcon';
</script>
<style scoped lang="scss">
.tabbar {
  min-width: 65px;
  height: 100vh;
  background-color: #f2f3f5;
  padding: 16px 0;
  box-sizing: border-box;
  &__nav {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    li {
      width: 100%;
    }
    .svg-icon {
      fill: #71747a;
      width: 24px;
      height: 24px;
    }
    &_item {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 2px solid #dae4f2;
    }
  }
}
.router-link-active {
  border-left: 2px solid #248bf2;
  .svg-icon {
    fill: #248bf2;
  }
}
</style>
