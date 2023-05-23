<template>
  <div class="container">
    <form @submit.prevent="register(email, password)">
      <div><input type="text" placeholder="Imię" v-model="name"></div>      
      <div><input type="mail" placeholder="Nazwisko" v-model="surname"></div>
      <div><input type="mail" placeholder="Email" v-model="email"></div>
      <div><input type="password" placeholder="Hasło" v-model="password"></div>
      <div><input type="password" @input="checkPassMatch" placeholder="Powtórz hasło" v-model="password2"></div>
      <div class="register"><button disabled type="submit">Zarejestruj</button></div>
      <p v-if="errorCode == 1">Zabroniony dostęp!</p>
      <p v-if="errorCode == 2">Błąd połączenia z serwerem!</p>
      <p v-if="errorCode == 3">Niepob hasło!</p>
      <p v-if="errorCode == 4">Nie znaleziono!</p>
      <p v-if="errorBefore == 1">Hasła się nie zgadzają!</p>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '../store/account.js'
const router = useRouter()
const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const errorCode = ref(0)
const errorBefore = ref(0)
const checkPassMatch = ()=>{
  if ((password.value != '') && (password2.value != '')) {
    if (password.value != password2.value) {
      errorBefore.value = 1
    }
    else{
      errorBefore.value = 0
    }
  }
  else {
    errorBefore.value = 0
  }
}
const preRegister=(name, surname, email, password)=>{
}
const register = async (name, surname, email, password) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        firstname: name,
        lastname: surname,
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
.register{
  display: flex;
  justify-content: center;
}
div{
  border-width: 0.5px;
  border-color: red;
  border-style: solid;
}
</style>
