<script setup>
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
const loggedIn =false
const token=''
const username=''
</script>

<template>
  <header>
        <div>
          <Menu
          :loggedIn="loggedIn"
          :username="username" />
        </div>
  </header>
  <RouterView />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Halvetica, Arial, sans-serif;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}</style>

