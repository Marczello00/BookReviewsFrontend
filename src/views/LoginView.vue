<template>
  <div class="container">
    <form @submit.prevent="login(email, password)">
      <input type="mail" @input="checkMail" placeholder="Email" v-model="email"> <br>
      <div v-show="errorMail==1">Niepoprawny adres</div>
      <input type="password" placeholder="Hasło" v-model="password"><br>
      <button type="submit">Zaloguj</button>
      <p v-if="errorCode == 1">Zabroniony dostęp!</p>
      <p v-if="errorCode == 2">Błąd połączenia z serwerem!</p>
      <p v-if="errorCode == 3">Niepoprawny login lub hasło!</p>
      <p v-if="errorCode == 4">Nie znaleziono!</p>
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '../store/account.js'
const router = useRouter()
const email = ref('')
const password = ref('')
const errorCode = ref(0)
const errorMail=ref(0)
const checkMail = ()=>{
  email.value!=''?(/^[^@]+@\w+(\.\w+)+\w$/.test(email.value)?errorMail.value=0:errorMail.value=1):errorMail.value=0
}
const login = async (email, password) => {
  try {
    const response = await fetch(account.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    switch (data.status) {
      case 401:
        errorCode.value = 1
        break;
      case 403:
        errorCode.value = 3
        break;
      case 404:
        errorCode.value = 4
        break;
    }
    if (data.token) {
      account.LogIn(email, data.token)
      router.push('/')
      errorCode.value = 0
    }
  }
  catch (error) {
    console.log(error)
    errorCode.value = 2
  }
}
console
</script>
  
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

form {
  display: block;
}

input {
  margin: 5px;
}
</style>
  