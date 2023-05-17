<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item @click="redirectTo('/')" index="0">Book Review System</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item v-if="account.isLoggedIn" @click="redirectTo('/books')" index="1">Książki</el-menu-item>
        <el-sub-menu index="2">
            <template #title><div v-if="account.email.length > 0">Witaj {{ account.email }}</div><div v-else>Witaj nieznajomy</div></template>
            <el-menu-item v-if="!account.isLoggedIn" @click="redirectTo('/login')" index="2-1">Zaloguj</el-menu-item>
            <el-menu-item v-if="!account.isLoggedIn" @click="redirectTo('/register')" index="2-2">Zarejestruj</el-menu-item>
            <el-menu-item v-if="account.isLoggedIn" @click="Logout()" index="2-2">Wyloguj</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router';
import { account } from '../store/account';

const activeIndex = ref('0')
const handleSelect = (key, keyPath) => {
}
const redirectTo = (dest) => {
    router.push(dest)
}
const Logout= ()=>{
    account.LogOut()
    router.push('/')
}
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>