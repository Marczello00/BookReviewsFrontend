<script setup>
import { ref } from 'vue'
import router from '../router';

const activeIndex = ref('0')
const handleSelect = (key, keyPath) => {
}
const redirectTo = (dest) => {
    router.push(dest)
}
const props = defineProps({
  LoggedIn: Boolean
})
</script>

<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item @click="redirectTo('/')" index="0">Book Review System</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="redirectTo('/books')" index="1">Książki</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Witaj nieznajomy</template>
            <el-menu-item v-if="!LoggedIn" @click="redirectTo('/login')" index="2-1">Zaloguj</el-menu-item>
            <el-menu-item v-if="!LoggedIn" @click="redirectTo('/register')" index="2-2">Zarejestruj</el-menu-item>
            <el-menu-item v-if="LoggedIn" @click="redirectTo('/')" index="2-2">Wyloguj</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>