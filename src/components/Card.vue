<template>
    <el-row>
      <el-col
        v-for="(item, o) in data"
        :key="o"
        :span="8"
        :offset="1"
      >
        <el-card :body-style="{ padding: '10px' }">
          <img
          src="../assets/img/book.jpg"
            class="image"
          />
          <div style="padding: 14px">
            <span>{{item.title}}</span>
            <div class="bottom">
              <time class="time">{{ item.author }}</time>
              <el-button text class="button">Napisz opinię</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  const props=defineProps(['data'])
  const data=ref(props.data)
  //console.log(data.value)
  </script>
  
  <style>
  .time {
    font-size: 12px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    min-height: auto;
  }
  
  .image {
    width: 100%;
    display: block;
  }
  </style>