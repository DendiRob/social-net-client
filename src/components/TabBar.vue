<template>
    <div class="tabbar">
        <nav>
          <ul class="tabbar__nav">
            <li>
              <router-link
              to="/"
              class="tabbar__nav_item"
              >
                <img src="../assets/tabbar/friends.svg" alt="home">
              </router-link>
            </li>
            <li>
              <router-link
              to="/chats"
              class="tabbar__nav_item"
              >
                <img src="../assets/tabbar/message.svg" alt="chat">
              </router-link>
            </li>
            <li>
              <router-link
              to="/posts"
              class="tabbar__nav_item"
              >
                <img src="../assets/tabbar/postIcon.svg" alt="postpage">
              </router-link>
            </li>
          </ul>
        </nav>
    </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
.tabbar {
    width: 65px;
    height: 100vh;
    background-color: #F2F3F5;
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
      &_item {
        box-sizing: border-box;
        width: 100%;
        padding: 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px solid #DAE4F2;
        img {
          margin-right: 2px;
        }
      }
    }
}
.router-link-active {
  border-left: 2px solid #248BF2;
}

</style>