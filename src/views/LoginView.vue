<template>
  <div class="container">
  <form @submit.prevent="login(email, password)">
    <input type="text" placeholder="Email" v-model="email"> <br>
    <input type="password" placeholder="Hasło" v-model="password"><br>
    <button type="submit" >Zaloguj</button>
  </form></div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email=ref('')
const password=ref('')
const login = async (email, password) => {
  console.log(email + ' ' + password)
  //router.push('/')
  try{
  const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);}
      catch(error){
        console.log(error)
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
form{
  display: block;
}
input{
  margin: 5px;
}
</style>
  