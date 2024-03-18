<template>
    <ElButton :class="buttonClass">Click me</ElButton>
  </template>
  
  <script setup>
  import { css } from '@emotion/css';
  import { ElButton } from 'element-plus';
  
  const buttonClass = css`
    background-color: blue;
    color: red;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  `;
  
  </script>
  