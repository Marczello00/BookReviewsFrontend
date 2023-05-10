<template>
    <el-form class="login-form" :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Login</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
  
  const form = ref({
    email: '',
    password: ''
  })
  
  const rules = {
    email: [
      { required: true, message: 'Please enter your email address', trigger: 'blur' },
      { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
    ],
    password: [
      { required: true, message: 'Please enter your password', trigger: 'blur' }
    ]
  }
  
  const handleSubmit = () => {
    const isValid = refs.form.validate()
    if (isValid) {
      login()
    }
  }
  const login = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    const data = await response.json()
    console.log(data) // do something with response data
    router.push('/books') // navigate to dashboard after successful login
  } catch (error) {
    console.error(error) // handle error
  }
}
  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    margin-top: 10vh;
  }
  
  .el-form-item__label {
    font-size: 16px;
    font-weight: bold;
  }
  
  .el-input__inner {
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 16px;
    padding: 10px;
  }
  
  .el-button--primary {
    background-color: #1890ff;
    border-color: #1890ff;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 3px;
  }
  
  .el-button--primary:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  </style>
  