import {reactive}  from 'vue'
export const account = reactive({
    loginUrl: 'http://localhost:8080/api/auth/login',
    registerUrl: 'http://localhost:8080/api/auth/register',
    allBooksUrl: 'http://localhost:8080/api/books/all',
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