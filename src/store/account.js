import {reactive}  from 'vue'
import router from '../router'
export const account = reactive({
    email: '',
    isLoggedIn: false,
    token: '',
    LogIn(mail, token){
        this.email = mail
        this.isLoggedIn = true
        this.token = token
    },
    LogOut(){
        this.email = ''
        this.isLoggedIn = false
        this.token = ''
    }
})