<template>
  <div>
    <el-popconfirm>
      <template #reference>
        <el-tooltip
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <el-button>top-start</el-button>
      </el-tooltip>
      </template>
    </el-popconfirm>



    
    <el-tooltip
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <el-popconfirm title="Are you sure to delete this?">
          <template #reference>
            <el-button>top-start</el-button>
          </template>
        </el-popconfirm>
      </el-tooltip>
  </div>
</template>

<style>

</style>
<script setup lang="ts">
import {
  ElTooltip,
  ElButton,
  ElPopconfirm
} from 'element-plus'
</script>