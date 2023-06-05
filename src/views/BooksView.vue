<template>
  <main>
    <div v-if="isDownloaded">
    <Card 
    :data="data"
    /></div>
  </main>
</template>

<script setup>
import {ref} from 'vue'
import { onMounted } from 'vue';
import Card from '../components/Card.vue'
import { account } from '../store/account.js'
var data=''
const isDownloaded=ref(0)
const download = async () => {
  try {
    const response = await fetch(account.allBooksUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + account.token
      }
    });
    data = await response.json();
    console.log(data)
    console.log("Downloaded")
    isDownloaded.value=1
  }
  catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  download()
  //console.log(data)
})
</script>
