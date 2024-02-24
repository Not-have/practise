<script setup lang="ts">
import { useRouter } from "vue-router"
import Router from '../router/enum'

const router = useRouter();

const handleUrl = () => {
    // router.push({ name: Router.ROUTER_$id_ROUTER_SON, params: { id: 'erina', name: 'test' } })
    router.push({
        name: Router.ROUTER_$id_ROUTER_SON,
        params: {
            id: 11
        },
        query: {
            id: 'erina', name: 'test'
        }
    })
}
</script>

<template>
    router
    
    <button @click="handleUrl">跳转</button>
    
    <router-view />
</template>

<style scoped>

</style>