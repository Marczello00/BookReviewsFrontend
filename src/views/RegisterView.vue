<template>
  <div class="container">
    <form @submit.prevent="preRegister(name, surname, email, password)">
      <div><input type="text" @input="checkName" placeholder="Imię" v-model="name"></div>
      <div v-show="errorName==1">Pole nie może być puste</div>
      <div><input type="text" @input="checkSurname" placeholder="Nazwisko" v-model="surname"></div>
      <div v-show="errorSurname==1">Pole nie może być puste</div>
      <div><input type="mail" @input="checkMail" placeholder="Email" v-model="email"></div>
      <div v-show="errorMail==1">Niepoprawny adres</div>
      <div><input type="password" @input="checkPass" placeholder="Hasło" v-model="password"></div>
      <div v-show="errorPass==1">Zbyt słabe hasło</div>
      <div><input type="password" @input="checkPassMatch" placeholder="Powtórz hasło" v-model="password2"></div>
      <div class="register"><button type="submit">Zarejestruj</button></div>
      <p v-if="errorCode == 1">Zabroniony dostęp!</p>
      <p v-if="errorCode == 2">Błąd połączenia z serwerem!</p>
      <p v-if="errorCode == 3">Niepoprawne hasło!</p>
      <p v-if="errorCode == 4">Nie znaleziono!</p>
      <p v-if="errorCode == 5">Błąd wenętrzny serwera</p>
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
const errorName = ref(0)
const errorSurname = ref(0)
const errorMail=ref(0)
const errorPass=ref(0)
const checkName = ()=>{
  name.value!=''?errorName.value=0:errorName.value=1
}
const checkSurname = ()=>{
  surname.value!=''?errorSurname.value=0:errorSurname.value=1
}
const checkMail = ()=>{
  /^[^@]+@\w+(\.\w+)+\w$/.test(email.value)?errorMail.value=0:errorMail.value=1
}
const checkPass=()=>{
  password.value!=''?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{}[\]:;\"'<>,.?/~])[a-zA-Z\d!@#$%^&*()\-=_+{}[\]:;\"'<>,.?/~]{8,32}$/.test(password.value)?errorPass.value=0:errorPass.value=1):errorPass.value=0
}
const checkPassMatch = ()=>{
  password.value!=''?(password.value != password2.value?errorBefore.value = 1:errorBefore.value = 0):errorBefore.value=0
}
const preRegister=(name, surname, email, password)=>{
}
const register = async (name, surname, email, password) => {
  try {
    console.log(name, surname, email, password)
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
      case 500:
        errorCode.value = 5
        break;
    }
    if (data.token) {
      account.LogIn(email, data.token)
      //router.push('/')
      console.log('registered')
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
